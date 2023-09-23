﻿using Data;
using Data.Attributes;
using Data.Entities.Profile;
using Data.Exceptions;
using Data.Models;
using Data.Models.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Application.Services.Authentication
{
    [Singleton]
    public class AuthService : IAuthService
    {
        private readonly IOptions<AppSettingsValues> _appSettingValues;
        private readonly IUserService _userService;

        public AuthService(IOptions<AppSettingsValues> appSettingValues, IUserService userService)
        {
            _userService = userService;
            _appSettingValues = appSettingValues;
        }

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request, CancellationToken cancellationToken)
        {
            var isEmail = IsEmail(request.UsernameOrEmail);
            var exceptionMessage = string.Empty;
            User? user;
            if (isEmail)
            {
                user = await _userService.FindByEmail(request.UsernameOrEmail, cancellationToken);
                exceptionMessage = "Invalid Email";
            }
            else
            {
                user = await _userService.FindByUsername(request.UsernameOrEmail, cancellationToken);
                exceptionMessage = "Invalid Username";
            }

            if (user == null) 
            {
                throw new UserNotFoundException(exceptionMessage);
            } 

            if(!HashPasswordComparison(request.Password, user.Password))
            {
                throw new InvalidPasswordException("Invalid Password");

            }

            var token = GenerateJwtToken(user);

            user.LastActive = DateTime.UtcNow;
            await _userService.UpdateAsync(user.Id, user, cancellationToken);

            return new AuthenticateResponse(user, token);
        }


        public async Task<AuthenticateResponse> Register(RegisterRequest request, CancellationToken cancellationToken)
        {
            var alreadyTakenUsername = await _userService.IsUsernameExistsAsync(request.Username, cancellationToken);
            if (alreadyTakenUsername)
                throw new AlreadyTakenUsernameException("This Username already been taken");

            var alreadyTakenEmail = await _userService.IsEmailExistsAsync(request.Username, cancellationToken);
            if (alreadyTakenEmail)
                throw new AlreadyTakenEmailException("This Email already been taken");

            var newUser = new User
            {
                Email = request.Email,
                Username = request.Username,
                Password = Hash(request.Password),
            };

            await _userService.CreateAsync(newUser, cancellationToken);

            var auth = await Authenticate(new AuthenticateRequest { Password = request.Password, UsernameOrEmail = newUser.Email }, cancellationToken);

            return auth; 

        }

        private static string  Hash(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            string hashedPassword = Convert.ToBase64String(hashBytes);

            return hashedPassword;
        }

        private static bool HashPasswordComparison(string enteredPassword, string storedPassword)
        {
            byte[] hashBytes = Convert.FromBase64String(storedPassword);

            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    throw new UnauthorizedAccessException();
                }
            }
            return true;
        }
        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 30 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettingValues.Value.JWTSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool IsEmail(string email)
        {
            return Regex.IsMatch(email, Constants.EmailRegexInput);
        }

    }
}
