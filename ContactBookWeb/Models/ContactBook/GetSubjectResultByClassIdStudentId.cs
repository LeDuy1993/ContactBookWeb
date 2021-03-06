﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.ContactBook
{
    public class GetSubjectResultByClassIdStudentId
    {
        public int SubjectResultId { get; set; }
        public int StudentId { get; set; }
        public int ClassId { get; set; }
        public int SemesterId { get; set; }
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public string ListPoint { get; set; }
        public string ListDate { get; set; }
        public string TeacherName { get; set; }
    }
}
