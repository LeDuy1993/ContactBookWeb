var teacher = {} || teacher;


teacher.cardTeacher = function (id) {
    $.ajax({
        url: `/Teacher/Cards/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#cards').empty();

            $.each(data.teachers, function (i, v) {
                $('#cards').append(
                    `
                    <div class="row clearfix">
                        <div class="col-lg-4 col-md-6 col-sm-12 mb-30">
                            <div class="da-card">
                                <div class="da-card-photo">
                                    <img src="~/vendors/images/photo3.jpg" alt="">
                                    <div class="da-overlay da-slide-left">
                                        <div class="da-social">
                                            <ul class="clearfix">
                                                <div class="dropdown">
                                            <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                                <i class="dw dw-more"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                                                <a class="dropdown-item" href="#"><i class="dw dw-eye"></i> View</a>
                                                <a class="dropdown-item" href="#"><i class="dw dw-edit2"></i> Edit</a>
                                                <a class="dropdown-item" href="#"><i class="dw dw-delete-3"></i> Delete</a>
                                            </div>
                                        </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="da-card-content">
                                    <h5 class="h5 mb-10">${v.teacherName}</h5>
                                    <p class="mb-0">${v.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            });
        }
    });
}

teacher.init = function () {

};

$(document).ready(function () {
    teacher.init();
});