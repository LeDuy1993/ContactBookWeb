var contactBook = {} || contactBook;
var courseId = 0;
var gradeId = 0;
var classId = 0;
var studentId = 0;
contactBook.showClass = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    studentId = $('#studentId').val();
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
    studentId = $('#studentId').val();
    $.ajax({
        url: `/ContactBook/ListStudent/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#studentId').empty();
            $.each(data.students, function (i, v) {
                $('#studentId').append(
                    `
                        <option value="${v.studentId}">${v.firstName} ${v.lastName}</option>        	
                    `
                );
            });
            contactBook.showClassPoint();
        }
    });
}
/*contactBook.showPoint = function () {
    courseId = $('#courseId').val();
    classId = $('#classId').val();
    studentId = $('#studentId').val();
    if (studentId == null) {
        $('#point1st').empty();
        $('#point2st').empty();
        $('#avg1').empty();
        $('#avg2').empty();
        $(`#information`).empty();
        $(`#semesterAvg`).empty();
    }
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
                        <td style="width:25%">Course: ${data.tableContactBook.courseName}</td>
                        <td>Class: ${data.tableContactBook.className}</td>
                        <td>Teacher master: ${data.tableContactBook.teacherName}</td>
                    </tr>
                    <tr>
                        <td style="width:25%">Full Name</td>
                        <td colspan="2">${data.tableContactBook.firstName} ${data.tableContactBook.lastName}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td colspan="2">${data.tableContactBook.gender}</td>
                    </tr>
                    <tr>
                        <td>Day of birth</td>
                        <td colspan="2">${data.tableContactBook.dayOfBirth}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td colspan="2">${data.tableContactBook.address}</td>
                    </tr>
                    <tr>
                        <td>Father/Morther Phone</td>
                        <td colspan="2">${data.tableContactBook.phoneNumber}</td>
                    </tr>
                </table>
                 `
            )
            $.each(data.tableContactBook.subjectPoint1, function (i, v) {
                if (v.subjectId == 1 || v.subjectId == 2) {
                    sum1 += parseFloat(v.listPoint[11]) * 2;
                    count1 += 2
                }
                else {
                    sum1 += parseFloat(v.listPoint[11]);
                    count1+=1
                }
                $('#point1st').append(
                    `
                     <tr>
                          <td title="${v.teacherName}"><b>${v.subjectName}</b></td>
                          <td title="${v.listDate[0]}">${v.listPoint[0]}</td>
                          <td title="${v.listDate[1]}">${v.listPoint[1]}</td>
                          <td title="${v.listDate[2]}">${v.listPoint[2]}</td>
                          <td title="${v.listDate[3]}">${v.listPoint[3]}</td>
                          <td title="${v.listDate[4]}">${v.listPoint[4]}</td>
                          <td title="${v.listDate[5]}">${v.listPoint[5]}</td>
                          <td title="${v.listDate[6]}">${v.listPoint[6]}</td>
                          <td title="${v.listDate[7]}">${v.listPoint[7]}</td>
                          <td title="${v.listDate[8]}">${v.listPoint[8]}</td>
                          <td title="${v.listDate[9]}">${v.listPoint[9]}</td>
                          <td title="${v.listDate[10]}">${v.listPoint[10]}</td>
                          <td> <b>${v.listPoint[11]}</b>
                            </td >
                      </tr>
                 `
                )
            });
            $(`#avg1`).append((sum1 / count1).toFixed(2));
            $.each(data.tableContactBook.subjectPoint2, function (i, v) {
                if (v.subjectId == 1 || v.subjectId == 2) {
                    sum2 += parseFloat(v.listPoint[11]) * 2;
                    count2 += 2
                }
                else {
                    sum2 += parseFloat(v.listPoint[11]);
                    count2 += 1
                }
                $('#point2st').append(
                    `
                       <tr>
                          <td title="${v.teacherName}"><b>${v.subjectName}</b></td>
                          <td title="${v.listDate[0]}">${v.listPoint[0]}</td>
                          <td title="${v.listDate[1]}">${v.listPoint[1]}</td>
                          <td title="${v.listDate[2]}">${v.listPoint[2]}</td>
                          <td title="${v.listDate[3]}">${v.listPoint[3]}</td>
                          <td title="${v.listDate[4]}">${v.listPoint[4]}</td>
                          <td title="${v.listDate[5]}">${v.listPoint[5]}</td>
                          <td title="${v.listDate[6]}">${v.listPoint[6]}</td>
                          <td title="${v.listDate[7]}">${v.listPoint[7]}</td>
                          <td title="${v.listDate[8]}">${v.listPoint[8]}</td>
                          <td title="${v.listDate[9]}">${v.listPoint[9]}</td>
                          <td title="${v.listDate[10]}">${v.listPoint[10]}</td>
                          <td> <b>${v.listPoint[11]}</b>
                            </td >
                      </tr>
                    `
                )
            });
            $(`#avg2`).append((sum2 / count2).toFixed(2));
            $(`#semesterAvg`).append((((sum2 / count2) * 2 + (sum1 / count1)) / 3).toFixed(2));
        }
    });
}*/
contactBook.showClassPoint = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    classId = $('#classId').val();
    studentId = $('#studentId').val();
    $.ajax({
        url: `/ContactBook/ShowClassPoint/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tablePoint').empty();

            $.each(data.tableClassPoint.studentPoints, function (i, v) {
                $('#classPoint1st').append(
                    `
                     <tr>
                          <td style="padding: 0.4rem"><b>${v.firstName} ${v.lastName}</b></td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[0]}</td>
                          <td style="padding: 0.4rem;" class="text-center" >${v.listPoint1[1]}</td>
                          <td style="padding: 0.4rem;" class="text-center" >${v.listPoint1[2]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[3]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[4]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[5]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[6]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[7]}</td>
                          <td style="padding: 0.4rem  " class="text-center" >${v.listPoint1[8]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[9]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[10]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint1[11]}</td>
                          <td style="padding: 0.4rem; " class="text-center"> <b>${v.listPoint1[12]}</b></td >  
                      </tr>
                 `
                )
                $('#classPoint2st').append(
                    `
                    <tr>
                          <td style="padding: 0.4rem"><b>${v.firstName} ${v.lastName}</b></td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[0]}</td>
                          <td style="padding: 0.4rem;" class="text-center" >${v.listPoint2[1]}</td>
                          <td style="padding: 0.4rem;" class="text-center" >${v.listPoint2[2]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[3]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[4]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[5]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[6]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[7]}</td>
                          <td style="padding: 0.4rem  " class="text-center" >${v.listPoint2[8]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[9]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[10]}</td>
                          <td style="padding: 0.4rem; " class="text-center" >${v.listPoint2[11]}</td>
                          <td style="padding: 0.4rem; " class="text-center"> <b>${v.listPoint2[12]}</b></td >  
                      </tr>
                 `
                )
            })
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