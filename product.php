<?php

class Product
{
    private $DataB;

    //construct
    public function __construct(mysqli $DataB)
    {
        $this->DataB = $DataB;
    }

    //Take the list from the data base into an array
    public function getProduct(): array
    {
        $pro = [];
        $result = $this->DataB->query('SELECT * FROM product');

        while ($row = $result->fetch_assoc()) {
            $pro[] = $row;
        }

        return $pro;
    }

    //delete obj
    public function delete(int $id): bool
    {
        $query = "DELETE FROM `product` WHERE `product`.`id` =$id";
        return $this->DataB->query($query);
    }

    //insert obj
    public function insert(int $id, string $name, string $description, int $price, string $picture): bool
    {
        $query = "INSERT INTO `product`(`id`, `name`, `description`, `price`, `picture`) VALUES ('$id','$name', '$description', '$price', '$picture');";
        return $this->DataB->query($query);
    }

    //update obj
    public function update(int $id, string $name, string $description, int $price, string $picture, int $old): bool
    {
        $query = "UPDATE `product` SET `id`='$id',`name`='$name',`description`='$description',`price`='$price',`picture`='$picture' WHERE `id`='$old'";
        return $this->DataB->query($query);
    }

}