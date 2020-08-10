var subjectResult = {} || subjectResult;
var courseId = 0;
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
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $('#classId').val();
    semesterId = $('#semesterId').val();
    subjectId = $('#subjectId').val();
    $.ajax({
        url: `/SubjectResult/ShowTablePoint/${courseId}/${semesterId}/${classId}/${subjectId}`,
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
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point1" value="${v.point1st}"
                            href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin1stId},$('#${v.studentId}point1').val(),${1},${v.studentId})"
                            /></td>
                         <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point2" value="${v.point2st}"
                            href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin2stId},$('#${v.studentId}point2').val(),${2},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point3"  value="${v.point3st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin3stId},$('#${v.studentId}point3').val(),${3},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point4"  value="${v.point4st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin4stId},$('#${v.studentId}point4').val(),${4},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point5"  value="${v.point5st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin5stId},$('#${v.studentId}point5').val(),${5},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point6"  value="${v.point6st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin6stId},$('#${v.studentId}point6').val(),${7},${v.studentId})"
                             /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point7"  value="${v.point7st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin7stId},$('#${v.studentId}point7').val(),${8},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:100%" id="${v.studentId}point8"  value="${v.point8st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin8stId},$('#${v.studentId}point8').val(),${9},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point9"  value="${v.point9st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin9stId},$('#${v.studentId}point9').val(),${11},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point10"  value="${v.point10st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin10stId},$('#${v.studentId}point10').val(),${12},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" ><input type="number" min="0" max="10" required="true" style="width:100%; height:20px" id="${v.studentId}point11"  value="${v.point11st}"
                             href="javascript:;" onchange="subjectResult.SaveResultPoint(${v.poin11stId},$('#${v.studentId}point11').val(),${13},${v.studentId})"
                            /></td>
                          <td style="padding: 0px; width: 5%;" type="number" min="0" max="10" required="true"  >${v.avg}
                            </td >
                  
                      </tr>
                      `
                );
            });
        }
    });
}

subjectResult.SaveResultPoint = function (id1, id2, id3, id4) {
    courseId = $('#courseId').val();
    classId = $('#classId').val();
    semesterId = $('#semesterId').val();
    subjectId = $('#subjectId').val();
    subjectResultId = id1;
    point = id2;
    typePointId = id3;
    studentId = id4;
    console.log(studentId);
    console.log(courseId);
    console.log(classId);
    console.log(semesterId);
    console.log(subjectId);
    console.log(subjectResultId);
    console.log(point);
    console.log(typePointId);
   
    $.ajax({
        url: `/SubjectResult/SaveResultPoint/${courseId}/${classId}/${semesterId}/${studentId}/${subjectId}/${subjectResultId}/${typePointId}/${point}`,
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