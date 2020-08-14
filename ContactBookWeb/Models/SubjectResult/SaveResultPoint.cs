using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.SubjectResult
{
    public class SaveResultPoint
    {
        public int SubjectResultId { get; set; }
        public int ClassStudentId { get; set; }
        public int SemesterId { get; set; }
        public int ClassSubjectId { get; set; }
        public string ListPoint { get; set; }
        public string ListDate { get; set; }
    }
}
