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
        public int StudentId { get; set; }
        public int SemesterId { get; set; }
        public int SubjectId { get; set; }
        public int TypePointId { get; set; }
        public int CourseId { get; set; }
        public int ClassId { get; set; }
        [Range(1, 10)]
        public float Point { get; set; }
    }
}
