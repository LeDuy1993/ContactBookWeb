using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.SubjectResult
{
    public class StudentPoint
    {
        public int SubjectResultId { get; set; }
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string[] ListPoint { get; set; }
        public string[] ListDate { get; set; }
        public float Avg { get; set; }

    }
}
