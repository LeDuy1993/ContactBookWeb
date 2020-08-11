﻿var student = {} || student;
var courseId = 0;
var gradeId = 0;


student.show = function (gradeId) {
    courseId = $('#selectCourseID').val();
    $.ajax({
        url: `/Student/ListClass/${courseId}/${gradeId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#classRoom').empty();
            $('#mytable').empty();
            $.each(data.classAll, function (i, v) {
                if (v.classId == 1) {
                    $('#classRoom').append(
                    `
                      <li class="nav-item">
                         <a class="nav-link active text-blue" data-toggle="tab" role="tab" aria-selected="true"  href="javascript:;"  onclick="student.showStudent(${v.classId})">Class ${v.className}</a>
                     </li>
                    `
                    );
                }
                else {
                    $('#classRoom').append(
                    `
                     <li class="nav-item">
						<a class="nav-link text-blue" data-toggle="tab" role="tab" aria-selected="false"  href="javascript:;" onclick="student.showStudent(${v.classId})">Class ${v.className}</a>
					</li>
                    `
                    );
                }
               
                
        });
}
    });
}
student.showStudent = function (classId) {
    $.ajax({
        url: `/Student/ListStudent/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#mytable').empty();
            $.each(data.students, function (i, v) {
                $('#mytable').append(
                    `
                     <tr>
                         <td scope="row">${v.studentId}</td>
                         <td>${v.firstName}</td>
                         <td>${v.lastName}</td>
                         <td>${v.gender}</td>
                         <td>${v.dayOfBirth}</td>
                         <td>
                              <div class="dropdown">
                                   <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                    <i class="dw dw-more"></i></a>
                                                                
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                        <a class="dropdown-item" href="javascript:;"  onclick="student.detailStudent(${v.studentId})"><i class="dw dw-eye"></i> View</a>
                                        <a class="dropdown-item"  href="javascript:;"  onclick="student.get(${v.studentId})"><i class="dw dw-edit2"></i> Edit</a>
                                        <a class="dropdown-item" href="#"><i class="dw dw-delete-3"></i> Delete</a>
                                     </div>
                               </div>
                         </td>
                    </tr>
                    	
                    `
                );
            });
        }
    });
}

student.openAddEditStudent = function () {
    student.reset();
    $('#addEditStudent').modal('show');
};

student.uploadAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#AvatarPath').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

student.reset = function () {
    $('#FirstName').val("");
    $('#LastName').val("");
    $('#StudentId').val(0);
    $('#customRadio4').prop('checked', true);
    $('#DayOfBirth').val("");
    $('#PlaceOfBirth').val("");
    $('#Address').val("");
    $('#NationId').val("");
    $('#ReligionId').val("");
    $('#FartherName').val("");
    $('#MortherName').val("");
    $('#JobName').val("");
    $('#PhoneNumber').val("");
    $('#AvatarPath').attr('src', '/images/noavatar.png')
}

student.get = function (id) {
    $.ajax({
        url: `/Student/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#FirstName').val(data.result.firstName);
            $('#LastName').val(data.result.lastName);
            $('#StudentId').val(id);
            $('#DayOfBirth').val(data.result.dayOfBirth);
            $('#PlaceOfBirth').val(data.result.placeOfBirth);
            $('#Address').val(data.result.address);
            $('#NationId').val(data.result.nationId);
            $('#ReligionId').val(data.result.religionId);
            $('#FartherName').val(data.result.fartherName);
            $('#MortherName').val(data.result.mortherName);
            $('#JobName').val(data.result.jobName);
            $('#PhoneNumber').val(data.result.phoneNumber);
            $('#AvatarPath').attr("src", data.result.avatarPath);         
            $('#addEditStudent').modal('show');
            if (data.result.gender == "Male") {
                $('#customRadio4').prop('checked', true);

            }
            else {
                $('#customRadio5').prop('checked', true);
            }
        
        }
    });
}

/*student.test = function (test) {
    gender = test;
    console.log(test);
}*/
student.save = function () {
    var saveStudent = {};
    saveStudent.firstName = $('#FirstName').val();
    saveStudent.lastName = $('#LastName').val();
    saveStudent.studentId = parseInt($('#StudentId').val());
    saveStudent.dayOfBirth = $('#DayOfBirth').val();
    saveStudent.placeOfBirth = $('#PlaceOfBirth').val();
    saveStudent.address = $('#Address').val();
    saveStudent.nationId = parseInt($('#NationId').val());
    saveStudent.religionId = parseInt($('#ReligionId').val());
    saveStudent.fartherName = $('#FartherName').val();
    saveStudent.mortherName = $('#MortherName').val();
    saveStudent.jobName = $('#JobName').val();
    saveStudent.phoneNumber = $('#PhoneNumber').val();
    saveStudent.AvatarPath = $('#AvatarPath').attr('src');
    saveStudent.gender = $("input[name='customRadio']:checked").val();

    $.ajax({
        url: `/Student/Save/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveStudent),
        success: function (data) {
            $('#addEditStudent').modal('hide');
            /* bootbox.alert(data.result.message);*/

        }
    });
}



student.initReligion = function () {
    $.ajax({
        url: `/ReligionNation/GetReligionAll`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#ReligionId').empty();
            $.each(data.religionAll, function (i, v) {
                $('#ReligionId').append(`<option value=${v.religionId} >${v.religionName}</option>`)
            });
        }
    });
}

student.initNation = function () {
    $.ajax({
        url: `/ReligionNation/GetNationAll`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#NationId').empty();
            $.each(data.nationAll, function (i, v) {
                $('#NationId').append(`<option value=${v.nationId} >${v.nationName}</option>`)
            });
        }
    });
}

student.detailStudent = function (studentId) {
   /* employee.reset();*/
    $('#viewStudent').appendTo("body").modal('show');
};  
student.init = function () {
    student.show();
    student.initReligion();
    student.initNation();
};

$(document).ready(function () {
    student.init();
    courseId = $('#selectCourseID').val();

});