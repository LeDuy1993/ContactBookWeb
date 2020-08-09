var teacher = {} || teacher;


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
            $('#Gender').val(data.result.gender = "true" ? 1:0);
            $('#Phone').val(data.result.phone);
            $('#Address').val(data.result.address);
            $('#SubjectId').val(data.result.subjectId);
            $('#DegreeId').val(data.result.degreeId);   
            $('#DayToWork').val(data.result.dayToWork);
            $('#AvatarPath').val(data.result.avatarPath);
            $('#addEditTeacher').modal('show');
        }
    });
}

teacher.reset = function () {
    $('#TeacherName').val("");
    $('#TeacherId').val(0);
    $('#DayOfBirth').val("");
    $('#PlaceOfBirth').val("");
    $('#Gender').val("");
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
    saveTeacher.gender = $('#Gender').val();
    saveTeacher.phone = $('#Phone').val();
    saveTeacher.address = $('#Address').val();
    saveTeacher.subjectId = parseInt($('#SubjectId').val());
    saveTeacher.degreeId = parseInt($('#DegreeId').val());
    saveTeacher.dayToWork = $('#DayToWork').val();
    saveTeacher.avatarPath = $('#AvatarPath').val();

    $.ajax({
        url: `/Teacher/Save/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveTeacher),
        success: function (data) {
            $('#addEditTeacher').modal('hide');
           /* bootbox.alert(data.result.message);*/
           /* teacher.drawTable();*/
        }
    });


}

teacher.initgender = function () {
    $("#Gender").empty();
    $("#Gender").append(`<option value = ${1} >${"Male"}</option>`)
    $("#Gender").append(`<option value = ${0} >${"Female"}</option>`)

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
    teacher.initgender();
    teacher.initSubject();
    teacher.initDegree();
};

$(document).ready(function () {
    teacher.init();
});
