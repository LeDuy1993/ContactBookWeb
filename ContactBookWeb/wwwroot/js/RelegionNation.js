var religionNation = {} || religionNation;

religionNation.showReligion = function () {
    $.ajax({
        url: `/ReligionNation/GetReligionAll`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#religion').empty();
            $.each(data.religionAll, function (i, v) {
                $('#religion').append(
                    `<tr>
                    <td class="table-plus">${v.religionId}</td>
                    <td>${v.religionName}</td>           
                    <td>
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
                            </td>
                    </tr>`
                );
            })

        }
    });
}

religionNation.init = function () {
    religionNation.showReligion();

};

$(document).ready(function () {
    religionNation.init();


});
