<!--search-->
<div><h4>Find a product</h4></div>
<input class="form-control" id="myInput" type="text" placeholder="Search..">

<!--table for list by bootstrap-->
<table class="table table-striped table-dark" id="tajax">
    <thead>
    <tr>
        <th scope="col">id</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Price</th>
        <th scope="col">Image</th>
        <th scope="col">Options</th>
    </tr>
    </thead>
    <tbody id="myTable">
    </tbody>
</table>
<!-- Button trigger Refresh -->
<button style="width: 100%;" type="button" class="btn btn-success" onclick="ajax()">
    Refresh
</button>
<div style="margin: 10px"></div>

<!-- Button trigger Insert -->
<button style="width: 100%" type="button" class="btn btn-primary" data-toggle="modal" data-target="#inmo"
        onclick="modalin()">
    Insert product
</button>
<?php require_once('modal.php');
