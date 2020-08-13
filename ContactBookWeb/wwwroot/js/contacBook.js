var contactBook = {} || contactBook;
var courseId = 0;
var gradeId = 0;
var classId = 0;
var studentId = 0;
contactBook.showClass = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();

    $.ajax({
        url: `/ContactBook/ListClass/${courseId}/${gradeId}`,
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
            contactBook.showStudent();
        }
    });
};
contactBook.showStudent = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $('#classId').val();
    $.ajax({
        url: `/ContactBook/ListStudent/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            var count = 1
            $('#studentId').empty();
            $.each(data.students, function (i, v) {

                $('#studentId').append(
                    `
                        <option value="${v.studentId}">${v.firstName} ${v.lastName}</option>        	
                        `
                );

            });
            contactBook.showPoint();
        }
    });
}
contactBook.showPoint = function () {
    courseId = $('#courseId').val();
    classId = $('#classId').val();
    studentId = $('#studentId').val();
    $.ajax({
        url: `/ContactBook/ShowTablePoint/${studentId}/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#point1st').empty();
            $('#point2st').empty();
            $('#avg1').empty();
            $('#avg2').empty();
            $(`#information`).empty();
            $(`#semesterAvg`).empty();
            var sum1 = 0;var sum2 = 0;
            var count1 = 0; var count2 = 0;
            var semesterAvg1 = 0; var semesterAvg2 = 0;
            $(`#information`).append(
                `<table style="width:100%">
                    <tr>
                        <td style="width:25%">Full Name</td>
                        <td>${data.tableContactBook.firstName} ${data.tableContactBook.lastName}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>${data.tableContactBook.gender}</td>
                    </tr>
                    <tr>
                        <td>Day of birth</td>
                        <td>${data.tableContactBook.dayOfBirth}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>${data.tableContactBook.address}</td>
                    </tr>
                    <tr>
                        <td>Father/Morther Phone</td>
                        <td>${data.tableContactBook.phoneNumber}</td>
                    </tr>
                </table>
                 `
            )
            $.each(data.tableContactBook.subjectPoint1st, function (i, v) {   
                if (v.subjectId == 1 || v.subjectId == 2) {
                    sum1 += v.avg * 2;
                    count1 += 2;
                }
                else {
                    sum1 += v.avg;
                    count1 += 1;
                }
                $('#point1st').append(
                    `
                         <tr>
                          <td title="${v.teacherName}"><b>${v.subjectName}</b></td>
                          <td title="${v.dateInput1st}">${v.point1st}</td>
                          <td title="${v.dateInput2st}">${v.point2st}</td>
                          <td title="${v.dateInput3st}">${v.point3st}</td>
                          <td title="${v.dateInput4st}">${v.point4st}</td>
                          <td title="${v.dateInput5st}">${v.point5st}</td>
                          <td title="${v.dateInput6st}">${v.point6st}</td>
                          <td title="${v.dateInput7st}">${v.point7st}</td>
                          <td title="${v.dateInput8st}">${v.point8st}</td>
                          <td title="${v.dateInput9st}">${v.point9st}</td>
                          <td title="${v.dateInput10st}">${v.point10st}</td>
                          <td title="${v.dateInput11st}">${v.point11st}</td>
                          <td> <b>${v.avg}</b>
                            </td >
                      </tr>
                 `
                )
            });
            $(`#avg1`).append((sum1 / count1).toFixed(2));
            $.each(data.tableContactBook.subjectPoint2st, function (i, v) {
                if (v.subjectId == 1 || v.subjectId == 2) {
                    sum2 += v.avg * 2;
                    count2 += 2;

                }
                else {
                    sum2 += v.avg;
                    count2 += 1;
                }
                $('#point2st').append(
                    `
                         <tr >
                          <td title="${v.teacherName}" ><b>${v.subjectName}</b></td>
                          <td>${v.point1st}</td>
                          <td>${v.point2st}</td>
                          <td>${v.point3st}</td>
                          <td>${v.point4st}</td>
                          <td>${v.point5st}</td>
                          <td>${v.point6st}</td>
                          <td>${v.point7st}</td>
                          <td>${v.point8st}</td>
                          <td>${v.point9st}</td>
                          <td>${v.point10st}</td>
                          <td>${v.point11st}</td>
                          <td type="number" min="0" max="10" required="true"><b>${v.avg}</b>
                            </td >    
                      </tr>
                    `
                )
            });
            $(`#avg2`).append((sum2 / count2).toFixed(2));
            $(`#semesterAvg`).append((((sum2 / count2) * 2 + (sum1 / count1)) / 3).toFixed(2));
        }
    });
}
contactBook.init = function () {
    contactBook.showClass();
};

$(document).ready(function () {
    contactBook.init();
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $('#classId').val();
    studentId = $('#studentId').val();

});