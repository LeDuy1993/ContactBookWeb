﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.ContactBook
{
    public class StudentPoint
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string[] ListPoint1 { get; set; }
        public string[] ListPoint2 { get; set; }
    }
}
