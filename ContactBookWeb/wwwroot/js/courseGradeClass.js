var courseGradeClass = {} || courseGradeClass;
var courseId = 0;





courseGradeClass.init = function () {
    courseGradeClass.showClass();
};

$(document).ready(function () {
    courseGradeClass.init();
    courseId = $('#courseId').val();
});