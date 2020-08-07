var student = {} || student;
var courseId = 0;
var gradeId = 0;

student.show = function (gradeId) {
    courseId = $('#selectCourseID').val();
    $.ajax({
        url: `/Student/ListClass/${courseId}/${gradeId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#classRoom').empty();
            $('#mytable').empty();
            $.each(data.classAll, function (i, v) {
                if (v.classId == 1) {
                    $('#classRoom').append(
                    `
                      <li class="nav-item">
                         <a class="nav-link active text-blue" data-toggle="tab" role="tab" aria-selected="true"  href="javascript:;"  onclick="student.showStudent(${v.classId})">Class ${v.className}</a>
                     </li>
                    `
                    );
                }
                else {
                    $('#classRoom').append(
                    `
                     <li class="nav-item">
						<a class="nav-link text-blue" data-toggle="tab" role="tab" aria-selected="false"  href="javascript:;" onclick="student.showStudent(${v.classId})">Class ${v.className}</a>
					</li>
                    `
                    );
                }
               
                
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
            $('#mytable').empty();
            $.each(data.students, function (i, v) {
                $('#mytable').append(
                    `
                     <tr>
                         <td scope="row">${v.studentId}</td>
                         <td>${v.firstName}</td>
                         <td>${v.lastName}</td>
                         <td>${v.gender}</td>
                         <td>${v.dayOfBirth}</td>
                         <td>
                              <div class="dropdown">
                                   <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                    <i class="dw dw-more"></i></a>
                                                                
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                        <a class="dropdown-item" href="javascript:;"  onclick="student.detailStudent(${v.studentId})"><i class="dw dw-eye"></i> View</a>
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
student.detailStudent = function (studentId) {
   /* employee.reset();*/
    $('#viewStudent').appendTo("body").modal('show');
};  
student.init = function () {
     student.show();
};

$(document).ready(function () {
    student.init();
    courseId = $('#selectCourseID').val();


});