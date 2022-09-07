const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");

// GET ALL PRODUCTS
router.get("/", middleware, (req, res) => {
    try {
      con.query(`SELECT * FROM products`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
});

  // GET A SINGLE PRODUCT BY ID
router.get("/:id", middleware, (req, res) => {
    try {
      con.query(`SELECT * FROM products where product_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
});

// ADDING A PRODUCT
router.post('/', middleware, (req, res) => {
      if (req.user.role === "admin") {
      const { name, category, image, price, color,  size, description } = req.body
      try {
          con.query(`INSERT INTO products (name, category, image, price, color,  size, description) values ('${name}', '${category}', '${image}', '${price}', '${color}', '${size}', '${description}')`, 
          (err, result) => {
              if (err) throw err;
              res.send(result);
            }); 
      } catch (error) {
         console.log(err);
      }
    }else {
      res.send("Access denied")
    };
});

// DELETE A PRODUCT BY ID
router.delete("/:id", middleware, (req, res) => {
    if (req.user.role === "admin"){
    try {
      con.query(`DELETE FROM products where product_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }else {
    res.send("Access denied")
  };
});

// UPDATE A PRODUCT BY ID
router.put('/:id', middleware, (req, res) => {
    if (req.user.role === "admin") {
    const { name, category, image, price, color,  size, description } = req.body
    try {
        con.query(`UPDATE products set name='${name}', category='${category}', image='${image}', price='${price}', color='${color}', size='${size}', description='${description}' WHERE product_id=${req.params.id}`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
          }); 
    } catch (error) {
       console.log(err) 
    }
    }else {
      res.send("Access denied")
    };
});

module.exports = router;