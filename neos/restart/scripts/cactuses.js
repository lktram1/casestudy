var cactus = {} || cactus;

cactus.drawtable = function () {
    $.ajax({
        url: "http://localhost:3000/cactuses",
        method: "GET",
        datatype: "json",
        success: function (data) {
            $('#tbcactus').empty();
        
            $.each(data, function (i, v) {
                $('#tbcactus').append(
                    "<tr>" +
                    "<td>" + v.id+ "</td>" +
                    "<td>" + v.name + "</td>" +
                    "<td><img src='" + v.picture + " ' width='50px' height='60px'/></td>" +
                    "<td>" + v.price + "</td>" +
                    "<td>" +
                    "<a href='javascript:;' title='edit cactus'  onclick='cactus.get(" + v.id + ")'><i class='fa fa-edit'></i></a> " +
                    "<a href='javascript:;' title='delete cactus' onclick='cactus.delete(" + v.id + ")'><i class='fa fa-trash'></i></a>" +
                    "</td>" +

                    "</tr>"
                );
            });

        }
    });
};
cactus.openmodal = function () {
    cactus.reset();
    $('#editcactus').modal('show');
};

cactus.save = function () {
    if ($('#formeditcactus').valid()) {
        if ($('#id').val() == 0) {
            var cactusobj = {};
            cactusobj.name = $('#name').val();
            cactusobj.picture = $('#picture').val();
            cactusobj.price = $('#price').val();

            $.ajax({
                url: "http://localhost:3000/cactuses",
                method: "POST",
                dataType: "JSON",
                contentType: "application/json",
                data: JSON.stringify(cactusobj),
                success: function (data) {
                    $("#editcactus").modal('hide');

                    cactus.drawtable();

                }
            });
        }
        else {
            var cactusobj = {};
            cactusobj.name = $('#name').val();
            cactusobj.picture = $('#picture').val();
            cactusobj.price = $('#price').val();
            cactusobj.id = $('#id').val();

            $.ajax({
                url: "http://localhost:3000/cactuses/" + cactusobj.id,
                method: "PUT",
                dataType: "JSON",
                contentType: "application/json",
                data: JSON.stringify(cactusobj),
                success: function (data) {
                    $("#editcactus").modal('hide');

                    cactus.drawtable();

                }
            });
        }
    };
};
    cactus.delete = function (id) {
        bootbox.confirm({
            title: "delete cactus?",
            message: "Do you want to delete this cactus now? This cannot be undone.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> no'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> yes'
                }
            },


            callback: function (result) {
                if (result) {
                    $.ajax({
                        url: "http://localhost:3000/cactuses/" + id,
                        method: "DELETE",
                        datatype: "json",
                        success: function (data) {
                            cactus.drawtable();
                        }
                    })
                }


            }
        });
    };

    cactus.get = function (id) {
        $.ajax({
            url: 'http://localhost:3000/cactuses/' + id,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#name').val(data.name);
                $('#picture').val(data.picture);
                $('#price').val(data.price);
                $('#id').val(data.id);
                let validator =$('#formeditcactus').validate();
                validator.resetForm();
                $('#editcactus').modal('show');
            }
        })
    }


cactus.reset = function () {
    $('#name').val('');
    $('#picture').val('');
    $('#price').val('');
    $('#id').val('0');
    let validator =$('#formeditcactus').validate();
    validator.resetForm();
}


cactus.init = function () {
    cactus.drawtable(); 
  
}
$(document).ready(function () {
    cactus.init();
})