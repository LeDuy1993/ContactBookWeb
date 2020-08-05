var student = {} || student;
var courseId = 0;
var gradeId = 0;

student.show = function () {
    courseId = $('#multipleSelect').val()[0];
    gradeId = $('#multipleSelect').val()[1];
    $.ajax({
        url: `/Student/ListClass/${courseId}/${gradeId}`,
        method: "GET",
         dataType: "json",
        success: function (data) {
            $('#classRoom').empty();
            $.each(data.classAll, function (i, v) {
                $('#classRoom').append(
                    `
                     <li class="nav-item">
                        <button  class="nav-link active text-blue" data-toggle="tab" onclick="student.showStudent(${v.classId})" role="tab" aria-selected="true">${v.className}</button>
                     </li>
                    `
                );
            });
        }
    });
}
student.showStudent = function (classId) {
    $.ajax({
        url: `/Student/ListStudent/${classId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#listStudent').empty();
            $.each(data.students, function (i, v) {
                $('#listStudent').append(
                    `
                     <tr>
                         <td class="table-plus">${v.studentId}</td>
                         <td>${v.firstName}</td>
                         <td>${v.lastName}</td>
                         <td>${v.gender}</td>
                         <td>${v.dayOfBirth}</td>
                         <td>
                              <div class="dropdown">
                                   <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                    <i class="dw dw-more"></i></a>
                                                                
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                        <a class="dropdown-item" href="#"><i class="dw dw-eye"></i> View</a>
                                        <a class="dropdown-item" href="#"><i class="dw dw-edit2"></i> Edit</a>
                                        <a class="dropdown-item" href="#"><i class="dw dw-delete-3"></i> Delete</a>
                                     </div>
                               </div>
                         </td>
                    </tr>
                    `
                );
            });
        }
    });
}
student.init = function () {
    student.show();
};

$(document).ready(function () {
    student.init();
    courseId = $('#multipleSelect').val()[0];
    gradeId = $('#multipleSelect').val()[1];
   
});