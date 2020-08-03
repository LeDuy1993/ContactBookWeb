var religionNation = {} || religionNation;

religionNation.showNation = function () {
    $.ajax({
        url: `/ReligionNation/GetNationAll`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#nation').empty();
            $.each(data.nationAll, function (i, v) {
                $('#nation').append(
                    `<tr>
                    <td>${v.nationId}</td>
                    <td>${v.nationName}</td>
                    <td>${v.students}</td>  
                    <td>
                        <a class="btn btn-success">Edit</a>   
                    </td>
                </tr>`
                );
            });
        }
    });
}
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
                    <td>${v.religionId}</td>
                    <td>${v.religionName}</td>           
                    <td>
                        <a class="btn btn-success">Edit</a>   
                    </td>
                </tr>`
                );
            });
        }
    });
}

religionNation.init = function () {
    religionNation.showReligion();
    religionNation.showNation();
};

$(document).ready(function () {
    religionNation.init();
});