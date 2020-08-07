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
            $('#classId').empty();

            $.each(data.classAll, function (i, v) {
                $('#classId').append(
                    `
                       <option value="${v.classId}">${v.className}-${v.teacherName}</option>        	
                     `
                );
            });

            subjectResult.showSubject()
        }
    });
};
subjectResult.showSubject = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $('#classId').val();
    $.ajax({
        url: `/SubjectResult/ListSubject/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#subjectId').empty();
            $('#students').empty();
            $.each(data.getResultClass.getSubjectByClassId, function (i, v) {
                if (v.subjectId == 1) {
                    $('#subjectId').append(
                        `
                      <li class="nav-item">
                         <a class="nav-link active text-blue" data-toggle="tab" role="tab" aria-selected="true"
                            href="javascript:;"  onclick="subjectResult.showPoint(${v.subjectId})"> ${v.subjectName}</a>
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
            $.each(data.getResultClass.getStudentByClassId, function (i, v) {
                $('#students').append(
                    `
                       <tr>
                        <td>${v.studentId}</td>
                        <td>${v.firstName}</td>
                        <td> ${v.lastName}</td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" /></td>
                        <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" /></td>
                        <td style="padding: 0px;" ></td>
                    </tr>
                    `
                );
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
    classId = $('#classId').val();
});