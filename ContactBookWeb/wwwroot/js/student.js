var student = {} || student;
var courseId = 0;
var gradeId = 0;

student.show = function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
}
student.init = function () {

};

$(document).ready(function () {
    courseId = $('#courseId').val();
    gradeId = $('#gradeId').val();
    student.init();
});