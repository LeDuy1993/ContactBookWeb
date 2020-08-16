var student = {} || student;
var courseId = 0;
var gradeId = 0;
var classId = 0;


student.show = function (gradeId) {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    $.ajax({
        url: `/Student/ListClass/${courseId}/${gradeId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#classId').empty();
            $('#mytable').empty();
            $.each(data.classRoomAll, function (i, v) {
                $('#classId').append(
                    `<option href="javascript:;" onchange="student.showStudent()" value="${v.classId}">${v.className}-${v.teacherName}</option>`
                )
            });
            student.showStudent();
        }
    });
}
student.showStudent = function () {
    classId = $(`#classId`).val();
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
        $('#FileUpload').hide();
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
            $('#FirstName').val(data.students.firstName);
            $('#LastName').val(data.students.lastName);
            $('#StudentId').val(id);
            $('#DayOfBirth').val(data.students.dayOfBirth);
            $('#PlaceOfBirth').val(data.students.placeOfBirth);
            $('#Address').val(data.students.address);
            $('#NationId').val(data.students.nationId);
            $('#ReligionId').val(data.students.religionId);
            $('#FartherName').val(data.students.fartherName);
            $('#MortherName').val(data.students.mortherName);
            $('#JobName').val(data.students.jobName);
            $('#PhoneNumber').val(data.students.phoneNumber);
            $('#AvatarPath').attr("src", data.students.avatarPath);
            $('#addEditStudent').modal('show');
            if (data.students.gender == "Male") {
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
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $(`#classId`).val();
});