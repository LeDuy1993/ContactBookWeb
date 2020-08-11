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
                        <a class="nav-link active" data-toggle="tab"  role="tab" aria-selected="true"  href="javascript:;" onclick="contactBook.showPoint({${v.studentId})" >${v.firstName} ${v.lastName} </a>
                    </li>
                     `
                    );
                }
                else {
                    $('#studentId').append(
                        `
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab"  role="tab" aria-selected="false"href="javascript:;" onclick="contactBook.showPoint({${v.studentId})">${v.firstName} ${v.lastName} </a>
                    </li>
                     `
                    );
                }
                count += 1;

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