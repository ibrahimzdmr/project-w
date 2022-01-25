import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { CharacterAbilities, CharacterApperance, CharacterBasics, CharacterCreationRequest, CharacterDescription, UpdateCharacterAbilitiesRequest, UpdateCharacterApperanceRequest, UpdateCharacterRequest } from "../models/character.model"
import { BaseDataService } from "./common/base-data.service"



@Injectable({
  providedIn: "root"
})
export class CharacterService extends BaseDataService {
  constructor(override readonly httpClient: HttpClient) {
    super(httpClient, 'Character')
  }

  getCharacterCreationBasics(characterId: number, userId: string): Promise<CharacterBasics>{
    return this.get<CharacterBasics>("GetCharacterCreationBasics",{characterId, userId});
  }

  createCharacter(request: CharacterCreationRequest): Promise<CharacterBasics>{
    return this.post<CharacterBasics>("CreateCharacter",request);
  }

  updateCharacter(request: UpdateCharacterRequest): Promise<boolean>{
    return this.post<boolean>("UpdateCharacter",request);
  }

  getCharacterApperance(characterId: number): Promise<CharacterApperance>{
    return this.get<CharacterApperance>("GetCharacterApperance",{characterId});
  }

  updateCharacterApperance(request: UpdateCharacterApperanceRequest): Promise<boolean>{
    return this.post<boolean>("UpdateCharacterApperance",request);
  }

  getCharacterDescription(characterId: number): Promise<CharacterDescription>{
    return this.get<CharacterDescription>("GetCharacterDescription",{characterId});
  }

  updateCharacterDescription(request: CharacterDescription): Promise<boolean>{
    return this.post<boolean>("UpdateCharacterDescription",request);
  }

  getCharacterAbilities(characterId: number): Promise<CharacterAbilities[]>{
    return this.get<CharacterAbilities[]>("GetCharacterAbilities",{characterId})
  }

  updateCharacterAbilities(request: UpdateCharacterAbilitiesRequest): Promise<boolean>{
    return this.post<boolean>("UpdateCharacterAbilities",request);
  }
}