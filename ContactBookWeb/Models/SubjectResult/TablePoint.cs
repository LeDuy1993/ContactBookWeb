using ContactBookWeb.Models.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.SubjectResult
{
    public class TablePoint
    {
        public List<GetStudentByClassId> students { get; set; }
        public List<StudentPoint> studentPoints { get; set; }
    }
}
