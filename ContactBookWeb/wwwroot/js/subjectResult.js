var subjectResult = {} || subjectResult;
var courseId = 0;
var gradeId = 0;
var classId = 0;


subjectResult.showClass = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    $.ajax({
        url: `/SubjectResult/ListClass/${courseId}/${gradeId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#classShow').empty();
            $.each(data.classAll, function (i, v) {
                $('#classShow').append(
                    `
                            <option value="${v.classId}">${v.className}</option>        	
                     `
                );
            });

        }
    });
};
subjectResult.showSubject = function () {
    classId = $('#classShow').val();
    $.ajax({
        url: `/SubjectResult/ListSubject/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#subjectId').empty();
            $.each(data.subjectByClassIds, function (i, v) {
                if (v.subjectId == 1) {
                    $('#subjectId').append(
                        `
                      <li class="nav-item">
                         <a class="nav-link active text-blue" data-toggle="tab" role="tab" aria-selected="true"
                            href="javascript:;"  onclick="student.showStudent(${v.subjectId})"> ${v.subjectName}</a>
                     </li>
                    `
                    );
                }
                else {
                    $('#subjectId').append(
                        `
                     <li class="nav-item">
						<a class="nav-link text-blue" data-toggle="tab" role="tab" aria-selected="false"
                            href="javascript:;" onclick="student.showStudent(${v.subjectId})">${v.subjectName}</a>
					</li>
                    `
                    );
                }
            });

        }
    });
}
subjectResult.init = function () {
    subjectResult.showClass();
    subjectResult.showSubject();
};

$(document).ready(function () {
    subjectResult.init();
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $('#classShow').val();
});