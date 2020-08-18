var teacher = {} || teacher;
teacher.closemodal = function () {
    $("#profileTeacher").modal("hide");
}

teacher.cardTeacher = function (id) {
    $.ajax({
        url: `/Teacher/Cards/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#cards').empty();

            $.each(data.teachers, function (i, v) {
                $('#cards').append(
                    `
                    <div class="row clearfix">
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-30">
                            <div class="da-card">
                                <div class="da-card-photo">
                                    <img src="~/vendors/images/photo3.jpg" alt="">
                                    <div class="da-overlay da-slide-left">
                                        <div class="da-social">
                                            <ul class="clearfix">
                                                <div class="dropdown">
                                            <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                                <i class="dw dw-more"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                                <a class="dropdown-item" href="#"><i class="dw dw-eye"></i> View</a>
                                                <a class="dropdown-item" href="javascript:;" onclick="teacher.get(${v.teacherId})"><i class="dw dw-edit2"></i> Edit</a>
                                                <a class="dropdown-item" href="#"><i class="dw dw-delete-3"></i> Delete</a>
                                            </div>
                                        </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="da-card-content">
                                    <h5 class="h5 mb-10">${v.teacherName}</h5>
                                    <p class="mb-0">${v.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            });
        }
    });
}







teacher.openAddEditTeacher = function () {
    teacher.reset();
    $('#addEditTeacher').modal('show');
};


/*teacher.openProfileTeacher = function () {
 * teacher
    $('#profileTeacher').modal('show');
};*/


teacher.getProfile = function (id) {
    $.ajax({
        url: `/Teacher/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#desteacher').find('#teachername').text(data.result.teacherName);
            $('#desteacher').find('#PlaceOfBirth').text(data.result.placeOfBirth);
            $('#desteacher').find('#TeacherId').text(id);
            $('#desteacher').find('#DayOfBirth').text(data.result.dayOfBirth);
            $('#desteacher').find('#Phone').text(data.result.phone);
            $('#desteacher').find('#Address').text(data.result.address);
            $('#desteacher').find('#SubjectId').text(data.result.subjectId);
            $('#desteacher').find('#DegreeId').text(data.result.degreeId);
            $('#desteacher').find('#DayToWork').text(data.result.dayToWork);
            $('#desteacher').find('#AvatarPath').attr("src", data.result.avatarPath);
            if ($('#desteacher').find(data.result.gender) == "1") {
                $('#customRadio4').prop('checked', true);

            }
            else {
                $('#customRadio5').prop('checked', true);
            }
            $('#profileTeacher').modal('show');

        }
    });
}


teacher.uploadAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#AvatarPath').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

teacher.delete = function (id) {
    bootbox.confirm({
        title: "Delete teacher?",
        message: "Do you want to delete this teacher.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: `/Teacher/Delete/${id}`,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert(data.result.message);
                        /*teacher.drawTable();*/
                    }
                });
            }
        }
    });
}

teacher.get = function (id) {
    $.ajax({
        url: `/Teacher/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TeacherName').val(data.result.teacherName);
            $('#TeacherId').val(id);
            $('#DayOfBirth').val(data.result.dayOfBirth);
            $('#PlaceOfBirth').val(data.result.placeOfBirth);
            $('#Phone').val(data.result.phone);
            $('#Address').val(data.result.address);
            $('#SubjectId').val(data.result.subjectId);
            $('#DegreeId').val(data.result.degreeId);   
            $('#DayToWork').val(data.result.dayToWork);
            $('#AvatarPath').attr("src", data.result.avatarPath);
            $('#addEditTeacher').modal('show');
            if (data.result.gender == "1") {
                $('#customRadio4').prop('checked', true);

            }
            else {
                $('#customRadio5').prop('checked', true);
            }
          
        }
    });
}

teacher.reset = function () {
    $('#TeacherName').val("");
    $('#TeacherId').val(0);
    $('#DayOfBirth').val("");
    $('#PlaceOfBirth').val("");
    $('#customRadio4').prop('checked', true);
    $('#Phone').val("");
    $('#Address').val("");
    $('#SubjectId').val("");
    $('#DegreeId').val("");
    $('#DayToWork').val("");
    $('#AvatarPath').val("");
}

teacher.save = function () {
    var saveTeacher = {};
    saveTeacher.teacherName = $('#TeacherName').val();
    saveTeacher.teacherId = parseInt($('#TeacherId').val());
    saveTeacher.dayOfBirth = $('#DayOfBirth').val();
    saveTeacher.placeOfBirth = $('#PlaceOfBirth').val();
    saveTeacher.gender = $("input[name='customRadio']:checked").val();
    saveTeacher.phone = $('#Phone').val();
    saveTeacher.address = $('#Address').val();
    saveTeacher.subjectId = parseInt($('#SubjectId').val());
    saveTeacher.degreeId = parseInt($('#DegreeId').val());
    saveTeacher.dayToWork = $('#DayToWork').val();
    saveTeacher.AvatarPath = $('#AvatarPath').attr('src');
    $.ajax({
        url: `/Teacher/Save/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveTeacher),
        success: function (data) {
            $('#addEditTeacher').modal('hide');
            bootbox.alert(data.result.message);
        }
    });


}

teacher.initSubject = function () {
    $.ajax({
        url: `/Subject/Gets`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#SubjectId').empty();
            $.each(data.subjects, function (i, v) {
                $('#SubjectId').append(`<option value=${v.subjectId} >${v.subjectName}</option>`)
            });
        }
    });
}

teacher.initDegree = function () {
    $.ajax({
        url: `/Degree/Gets`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#DegreeId').empty();
            $.each(data.degrees, function (i, v) {
                $('#DegreeId').append(`<option value=${v.degreeId} >${v.degreeName}</option>`)
            });
        }
    });
}

teacher.init = function () {
   
    teacher.initSubject();
    teacher.initDegree();
};

$(document).ready(function () {
    teacher.init();
});
