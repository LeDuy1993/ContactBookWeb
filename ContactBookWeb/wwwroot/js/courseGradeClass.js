var courseGradeClass = {} || courseGradeClass;
var courseId = 0;

courseGradeClass.showClass = function () {
    courseId = $('#courseId').val();
    $.ajax({
        url: `/CourseGradeClass/ListClass/${courseId}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#grade10').empty();
            $('#grade11').empty();
            $('#grade12').empty();
            $.each(data.classRoomAll, function (i, v) {
                if (v.gradeId == 1) {
                    $('#grade10').append(
                        `
                        <li class="nav-item text-left ml-4">
                        <a class="nav-link"  href="Student/ListStudent/${v.classId}"   aria-selected="false"><span class="icon-copy ti-hand-point-right"></span> ${v.className} <i class="icon-copy ion-ios-people text-success"></i> ${v.students} - <b>${v.teacherName}</b></a> 
                        </li>  	
                        `
                    );
                }
                else if (v.gradeId == 2) {
                    $('#grade11').append(
                        `
                        <li class="nav-item text-left ml-4">
                        <a class="nav-link"  href="Student/ListStudent/${v.classId}"  aria-selected="false"><span class="icon-copy ti-hand-point-right"></span> ${v.className} <i class="icon-copy ion-ios-people text-success"></i> ${v.students} - <b>${v.teacherName}</b></a> 
                        </li>  	 	
                    `
                    );
                }
                else {
                    $('#grade12').append(
                        `
                         <li class="nav-item text-left ml-4">
                        <a class="nav-link"  href="Student/ListStudent/${v.classId}"  aria-selected="false"><span class="icon-copy ti-hand-point-right"></span> ${v.className} <i class="icon-copy ion-ios-people text-success"></i> ${v.students} - <b>${v.teacherName}</b></a> 
                        </li>  		
                        `
                    );
                }  
            });
        }
    });
}


courseGradeClass.init = function () {
    courseGradeClass.showClass();
};

$(document).ready(function () {
    courseGradeClass.init();
    courseId = $('#courseId').val();
});