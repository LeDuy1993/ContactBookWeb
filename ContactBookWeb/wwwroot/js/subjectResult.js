var subjectResult = {} || subjectResult;
var gradeId = 0;
var classId = 0;
var semesterId = 0;
var subjectId = 0;


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
    semesterId = $('#semesterId').val();
    subjectId = $('#subjectId').val();
    $.ajax({
        url: `/SubjectResult/ListSubject/${courseId}/${semesterId}/${classId}/${subjectId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#subjectId').empty();
            $.each(data.subjects, function (i, v) {
                $('#subjectId').append(
                    `
                       <option value="${v.subjectId}">${v.subjectName}</option>        	
                     `
                );
            });
            subjectResult.showTablePoint();
        }
    });
}
subjectResult.showTablePoint = function () {
    gradeId = $('#gradeId').val();
    classId = $('#classId').val();
    semesterId = $('#semesterId').val();
    subjectId = $('#subjectId').val();
    $.ajax({
        url: `/SubjectResult/ShowTablePoint/${semesterId}/${classId}/${subjectId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#studentPoints').empty();
            $.each(data.tablePoints.studentPoints, function (i, v) {
                $('#studentPoints').append(
                    `
                         <tr>
                          <td>${v.studentId}</td>
                          <td>${v.firstName}</td>
                          <td>${v.lastName}</td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point1" value="${v.listPoint[0]}"
                            href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point1').val(),${0},${v.studentId},${v.subjectResultId})"
                            /></td>
                         <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point2" value="${v.listPoint[1]}"
                            href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point2').val(),${1},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point3"  value="${v.listPoint[2]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point3').val(),${2},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point4"  value="${v.listPoint[3]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point4').val(),${3},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point5"  value="${v.listPoint[4]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point5').val(),${4},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point6"  value="${v.listPoint[5]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point6').val(),${5},${v.studentId},${v.subjectResultId})"
                             /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point7"  value="${v.listPoint[6]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point7').val(),${6},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point8"  value="${v.listPoint[7]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point8').val(),${7},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point9"  value="${v.listPoint[8]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point9').val(),${8},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point10"  value="${v.listPoint[9]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point10').val(),${9},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point11"  value="${v.listPoint[10]}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint($('#${v.studentId}point11').val(),${10},${v.studentId},${v.subjectResultId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" type="number" min="0" max="10" required="true">${v.listPoint[11]}
                            </td >
                      </tr>
                      `
                );
            });
        }
    });
}

subjectResult.SaveResultPoint = function (point, index, studentId, subjectResultId) {
    classId = $('#classId').val();
    semesterId = $('#semesterId').val();
    subjectId = $('#subjectId').val();
    $.ajax({
        url: `/SubjectResult/SaveResultPoint/${classId}/${semesterId}/${studentId}/${subjectId}/${point}/${index}/${subjectResultId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            subjectResult.showTablePoint();
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
    semesterId = $('#semesterId').val();
    subjectId = $('#subjectId').val();
});