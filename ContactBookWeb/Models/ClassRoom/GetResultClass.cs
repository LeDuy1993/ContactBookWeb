using ContactBookWeb.Models.Student;
using ContactBookWeb.Models.Subject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.ClassRoom
{
    public class GetResultClass
    {
        public string TeacherName { get; set; }
        public List<GetSubjectByClassId> GetSubjectByClassId { get; set; }
        public List<GetStudentByClassId> GetStudentByClassId { get; set; }
    }
}
