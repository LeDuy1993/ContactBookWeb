using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.Subject
{
    public class GetSubjectByClassId
    {
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public int Coefficient { get; set; }
        public string TeacherName { get; set; }
    }
}
