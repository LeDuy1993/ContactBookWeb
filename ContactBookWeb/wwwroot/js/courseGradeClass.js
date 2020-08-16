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
                        <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#profile7" role="tab" aria-selected="false">${v.className}</a>
                        </li>  	
                        `
                    );
                }
                else if (v.gradeId == 2) {
                    $('#grade11').append(
                        `
                        <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#profile7" role="tab" aria-selected="false">${v.className}</a>
                        </li>  	 	
                    `
                    );
                }
                else {
                    $('#grade12').append(
                        `
                         <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#profile7" role="tab" aria-selected="false">${v.className}</a>
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