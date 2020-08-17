using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.Student
{
    public class SaveStudentRequest
    {
        public int StudentId { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "Can not exceed 20 characters")]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "Can not exceed 20 characters")]
        public string LastName { get; set; }
        public string Gender { get; set; }
        [Required]
        public string DayOfBirth { get; set; }
        [Required]
        public string PlaceOfBirth { get; set; }
        [Required]
        public string Address { get; set; }
        public int NationId { get; set; }
        public int ReligionId { get; set; }
        public string FartherName { get; set; }
        public string MortherName { get; set; }
        public string JobName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string AvatarPath { get; set; }
    }
}
