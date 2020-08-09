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
    console.log(subjectId);
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
                          <td> ${v.lastName}</td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" value="${v.point1st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" value="${v.point2st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" value="${v.point3st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" value="${v.point4st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" value="${v.point5st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" value="${v.point6st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" value="${v.point7st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:100%" value="${v.point8st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" value="${v.point9st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" value="${v.point10st}" /></td>
                          <td style="padding: 0px; width: 5%;" ><input style="width:100%; height:20px" value="${v.point11st}" /></td>
                          <td style="padding: 0px; width: 5%;" ></td>
                  
                      </tr>
                      `
                  );
              });
        }
    });
}
subjectResult.addTablePoint = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $('#classId').val();
    semesterId = $('#semesterId').val();
    subjectId = $('#subjectId').val();
    $.ajax({
        url: `/SubjectResult/Create/${courseId}/${gradeId}/${classId}/${semesterId}/${subjectId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {

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