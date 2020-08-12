var contactBook = {} || contactBook;
var courseId = 0;
var gradeId = 0;
var classId = 0;
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
                if (count == 1) {
                    $('#studentId').append(
                        `
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab"  role="tab" aria-selected="true"  href="javascript:;" onclick="contactBook.showPoint(${v.studentId})" >${v.firstName} ${v.lastName} </a>
                    </li>
                     `
                    );
                }
                else {
                    $('#studentId').append(
                        `
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab"  role="tab" aria-selected="false" href="javascript:;" onclick="contactBook.showPoint(${v.studentId})">${v.firstName} ${v.lastName} </a>
                    </li>
                     `
                    );
                }
                count += 1;

            });
        }
    });
}
contactBook.showPoint = function (studentId) {
    courseId = $('#courseId').val();
    classId = $('#classId').val();
    $.ajax({
        url: `/ContactBook/ShowTablePoint/${courseId}/${studentId}/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#point1st').empty();
            $('#point2st').empty();
            $.each(data.tableContactBook.subjectPoint1st, function (i, v) {
                $('#point1st').append(
                `
                         <tr>
                          <td>${v.subjectId}</td>
                          <td>${v.subjectName}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point1st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point2st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point3st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point4st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point5st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point6st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point7st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point8st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point9st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point10st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point11st}</td>
                          <td style="padding: 0px; width: 5%;" type="number" min="0" max="10" required="true">${v.avg}
                            </td >
                  
                      </tr>
                 `
                )
            });
            $.each(data.tableContactBook.subjectPoint2st, function (i, v) {
                $('#point2st').append(
                    `
                         <tr>
                          <td>${v.subjectId}</td>
                          <td>${v.subjectName}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point1st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point2st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point3st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point4st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point5st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point6st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point7st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point8st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point9st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point10st}</td>
                          <td style="padding: 0px; width: 5%;" >${v.point11st}</td>
                          <td style="padding: 0px; width: 5%;" type="number" min="0" max="10" required="true">${v.avg}
                            </td >
                  
                      </tr>
                 `
                )
            });
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

});