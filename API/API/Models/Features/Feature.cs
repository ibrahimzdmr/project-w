﻿using System.Collections.Generic;

namespace API.Models.Login
{
    public class Feature
    {
        public string Section { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public List<Requirement> Requirements { get; set; }

    }

    public class  Requirement
    {
        public string Section { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }

    }
}
