//Calling AJAX functionality at the opening of the page
$(function () {
    ajax();
});

//AJAX functionality for internal page refresh
function ajax() {

    $(`#myTable`).remove();

    var table = $('#tajax');

    $(` <tbody id="myTable"></tbody>`).appendTo(table);

    var tbody = $('#tajax tbody');

    $.get('json.php').then(data => {
        const items = JSON.parse(data);
        $.each(items, function (i, item) {
            var tr = $(`<tr id ="${item['id']}">`);
            $(`<td>${item['id']}</td>
            <td>${item['name']}</td>
            <td>${item['description']}</td>
            <td>${item['price']}</td>
            <td><img src="${item['picture']}" id="pic"></td>
            <td><input type="hidden" name="id" value="${item['id']}">
            <input type="button" name="delete" value="Delete" class="btn btn-danger" onclick="del(${item['id']})">
            <br>
            <input type="hidden" name="id" value="${item['id']}">
            <input type="button" name="update" value="Update" class="btn btn-primary" data-toggle="modal"
                   data-target="#up" onclick="modalup(${item['id']})"></td>`).appendTo(tr);
            tbody.append(tr);
        });
    });

}

//Table search function
$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

//Function for editing MODAL in upload
function modalup(id) {

    $(`#modal2`).remove();
    var modal = $('#modal1');

    $.get('json.php').then(data => {
        const items = JSON.parse(data);

        $.each(items, function (i, item) {
            if (item['id'] == id) {

                $(`<div id="modal2"><input type="hidden" id="old_id-mod" name="old_id" value="${item['id']}">
                <label for="id">ID:</label><br>
            <input type="text" id="id-mod" name="id" value="${item['id']}"><br>
                <label for="name">Name:</label><br>
            <input type="text" id="name-mod" name="name" value="${item['name']}"><br>
                <label for="description">Description:</label><br>
            <textarea id="description-mod" name="description" rows="4"
            cols="30">${item['description']}</textarea><br>
                <label for="price">Price:</label><br>
            <input type="text" id="price-mod" name="price"
            value="${item['price']}"><br>
                <label for="picture">Picture:</label><br>
            <input type="text" id="picture-mod" name="picture"
            value="${item['picture']}"></div>`).appendTo(modal);

            }

        });
    });

}

//Function for editing MODAL in insert
function modalin() {

    $(`#modalin2`).remove();
    var modalinsert = $('#modalin1');

    $(`<div id="modalin2"><label for="id">ID:</label><br>
                    <input type="text" id="id-insert" name="id" value="id"><br>
                    <label for="name">Name:</label><br>
                    <input type="text" id="name-insert" name="name" value="name"><br>
                    <label for="description">Description:</label><br>
                    <textarea id="description-insert" name="description" rows="4" cols="30" >description</textarea><br>
                    <label for="price">Price:</label><br>
                    <input type="text" id="price-insert" name="price" value="price"><br>
                    <label for="picture" >Picture:</label><br>
                    <input type="text" id="picture-insert" name="picture" value="picture"></div>`).appendTo(modalinsert);

}

//Delete function sends a post request to the server for delete
function del(id) {
    $.post(`delete.php`, {id: id}).then(data => {
        $(`#${id}`).remove();
        alert(`${id} delete successfully`)
    });
}

//Insert function sends a post request to the server for insert
function inser() {

    var id = $("#id-insert").val();
    var name = $("#name-insert").val();
    var description = $("#description-insert").val();
    var price = $('#price-insert').val();
    var picture = $("#picture-insert").val();

    var datain = {"id": id, "name": name, "description": description, "price": price, "picture": picture};


    $.get('json.php').then(data => {
        const items = JSON.parse(data);

        $.each(items, function (i, item) {

            if (item['id'] == id) {
                alert("ID used Select another!");
                exit();
            }
        });

        if (valid(id, price, name, description, picture)) {
            $.post(`insert.php`, {datain: datain}).then(data => {
                ajax();
                alert(`${name} insert successfully`)
            });
            $('#inmo').modal('hide');

        }

    });

}

//Update function sends a post request to the server for update
function upde() {

    var oldId = $("#old_id-mod").val();
    var id = $("#id-mod").val();
    var name = $("#name-mod").val();
    var description = $("#description-mod").val();
    var price = $('#price-mod').val();
    var picture = $("#picture-mod").val();


    var dataup = {
        "id": id,
        "name": name,
        "description": description,
        "price": price,
        "picture": picture,
        "oldId": oldId
    };


    $.get('json.php').then(data => {
        const items = JSON.parse(data);
        if (oldId != id) {
            $.each(items, function (i, item) {

                if (item['id'] == id) {
                    alert("ID used Select another!");
                    exit();
                }
            });
        }
        if (valid(id, price, name, description, picture)) {
            $.post(`update.php`, {dataup: dataup}).then(data => {
                ajax();
                alert(`${name} edited successfully`)
            });
            $('#up').modal('hide');
        }

    });

}

//Function for checking the data before sending it to the server
function valid(id, price, name, description, picture) {

    // If id is Not a Number or less than zero
    if (id != "id-good") {
        if (isNaN(id) || id < 0 || "") {
            alert("Input id not valid");
            return false;
        }
    }

    if (isNaN(price) || price < 0) {
        alert("Input price not valid");
        return false;
    }

    var letter = /[^a-zA-Z\s-]/;

    if (letter.test(name) || "") {
        alert('Please input alphabet characters only for name');
        return false;
    }
    if (letter.test(description) || "") {
        alert('Please input alphabet characters only for description');
        return false;
    }
    var picch = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');

    var end = picture.substring(picture.lastIndexOf('.') + 1);
    if (end == "jpeg" || end == "jpg" || end == "bmp" || end == "gif" || end == "png") {
        return true
    } else if (!!picch.test(picture)) {
        return true;
    } else {
        alert("Image only allows file types of GIF, PNG, JPG, JPEG and BMP. Or valid URL");
        return false;
    }
    return true;
}

