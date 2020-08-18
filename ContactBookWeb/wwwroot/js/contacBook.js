
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
contactBook.showStudentPoint = function (Id) {
    courseId = $('#courseId').val();
    classId = $('#classId').val();
    studentId = Id;

    $.ajax({
        url: `/ContactBook/ShowTablePoint/${studentId}/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#table').empty();
            $(`#export`).empty();
            $('#table').append(
                `
		         <nav aria-label="breadcrumb" role="navigation">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="javascript:;" onclick="contactBook.showClassPoint()">Class: ${data.tableContactBook.className}</a></li>
					    <li class="breadcrumb-item active" aria-current="page">${data.tableContactBook.firstName} ${data.tableContactBook.lastName}</li>
				    </ol>
				</nav>
              
                <table class="table table-bordered text-center" id="tablePoint" style=" border-radius: 5px">
                    <thead class="text-center">
                        <tr>
                            <th colspan="13" style="font-size:25px" class="text-center">Contact Book</th>
                        </tr>
                        <tr>
                            <th colspan="13" id="informationStudent">
                            </th>
                        </tr>
                        <tr>
                            <th class="text-center" style="width:15%" rowspan="2">Subject</th>
                            <th class="text-center" colspan="4">Điểm Miệng</th>
                            <th class="text-center" colspan="4">Điểm 15 phút</th>
                            <th class="text-center" colspan="2">Điểm 1 tiết</th>
                            <th class="text-center" rowspan="2">Point master</th>
                            <th class="text-center" rowspan="2">Average</th>
                        </tr>
                        <tr>
                            <th class="text-center">1st</th>
                            <th class="text-center">2st</th>
                            <th class="text-center">3st</th>
                            <th class="text-center">4st</th>
                            <th class="text-center">1st</th>
                            <th class="text-center">2st</th>
                            <th class="text-center">3st</th>
                            <th class="text-center">4st</th>
                            <th class="text-center">1st</th>
                            <th class="text-center">2st</th>
                        </tr>
                    </thead>
                    <tbody id="point1st">
                    </tbody>
                    <thead>
                        <tr>
                            <th class="text-center" colspan="12">Semester 1</th>
                            <th class="text-center" id="avg1"></th>
                        </tr>
                        <tr>
                            <th class="text-center" rowspan="2">Subject</th>
                            <th class="text-center" colspan="4">Điểm Miệng</th>
                            <th class="text-center" colspan="4">Điểm 15 phút</th>
                            <th class="text-center" colspan="2">Điểm 1 tiết</th>
                            <th class="text-center" rowspan="2">Point master</th>
                            <th class="text-center" rowspan="2">Average</th>
                        </tr>
                        <tr>
                            <th class="text-center">1st</th>
                            <th class="text-center">2st</th>
                            <th class="text-center">3st</th>
                            <th class="text-center">4st</th>
                            <th class="text-center">1st</th>
                            <th class="text-center">2st</th>
                            <th class="text-center">3st</th>
                            <th class="text-center">4st</th>
                            <th class="text-center">1st</th>
                            <th class="text-center">2st</th>
                        </tr>
                    </thead>
                    <tbody id="point2st">
                    </tbody>
                    <thead>
                        <tr>
                            <th colspan="12" class="text-center">Semester 2</th>
                            <th id="avg2" class="text-center"></th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th colspan="12" class="text-center">Summarize the year</th>
                            <th id="semesterAvg" class="text-center"></th>
                        </tr>
                    </thead>
                </table>`
            )
            var sum1 = 0;var sum2 = 0;
            var count1 = 0; var count2 = 0;
            var semesterAvg1 = 0; var semesterAvg2 = 0;
            $(`#informationStudent`).append(
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
            $(`#export`).append(`<button type="button" class="btn btn-dark" onclick="tableToExcel('table', 'W3C Example Table')" value="Export to Excel">Export to Excel</button>`)
        }
    });
}
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
            $('#table').empty();
            $(`#export`).empty();
            $('#table').append(
               ` 
                <table class="table table-bordered" id="classPoint" style=" border-radius: 5px">
                    <thead class="text-center">
                        <tr>
                            <th colspan="15" style="font-size:25px" class="text-center">Contact Book</th>
                        </tr>
                        <tr>
                            <th colspan="15" id="informationClass">
                            </th>
                        </tr>
                        <tr>
                            <th>Semester 1</th>
                            <th style="padding:0">Toán</th>
                            <th style="padding:0">Văn</th>
                            <th style="padding:0">Anh</th>
                            <th style="padding:0">Lý</th>
                            <th style="padding:0">Hóa</th>
                            <th style="padding:0">Sinh</th>
                            <th style="padding:0">Sử</th>
                            <th style="padding:0">Địa</th>
                            <th style="padding:0">GDCD</th>
                            <th style="padding:0">Công Nghê</th>
                            <th style="padding:0">Tin Học</th>
                            <th style="padding:0">Ngoại Ngữ</th>
                            <th style="padding:0">AVG</th>
                        </tr>
                    </thead>
                    <tbody id="classPoint1st">
                    </tbody>
                    <thead>
                        <tr>
                            <th>Semester 2</th>
                            <th class="text-center">Toán</th>
                            <th class="text-center">Văn</th>
                            <th class="text-center">Anh</th>
                            <th class="text-center">Lý</th>
                            <th class="text-center">Hóa</th>
                            <th class="text-center">Sinh</th>
                            <th class="text-center">Sử</th>
                            <th class="text-center">Địa</th>
                            <th class="text-center">GDCD</th>
                            <th class="text-center">Công Nghê</th>
                            <th class="text-center">Tin Học</th>
                            <th class="text-center">Ngoại Ngữ</th>
                            <th class="text-center">AVG</th>
                        </tr>
                    </thead>
                    <tbody id="classPoint2st">
                    </tbody>
                </table>`
            )
            $('#informationClass').append(
                `<table style="width:100%">
                    <tr>
                        <td style="width:25%">Course: ${data.tableClassPoint.courseName}</td>
                        <td>Class: ${data.tableClassPoint.className}</td>
                        <td>Teacher master: ${data.tableClassPoint.teacherName}</td>
                    </tr>
                </table>
                 `
            )
            $.each(data.tableClassPoint.studentPoints, function (i, v) {
                $('#classPoint1st').append(
                    `
                     <tr>
                          <td style="padding: 0.4rem">
                         <a href="javascript:;" onclick="contactBook.showStudentPoint(${v.studentId})"><b>${v.firstName} ${v.lastName}</b></a>
                          </td>
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
                          <td style="padding: 0.4rem">
                         <a href="javascript:;" onclick="contactBook.showStudentPoint(${v.studentId})"><b>${v.firstName} ${v.lastName}</b></a>
                          </td>
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
            $(`#export`).append(`<button type="button" class="btn btn-dark" onclick="tableToExcel('classPoint', 'W3C Example Table')" value="Export to Excel">Export to Excel</button>`)
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