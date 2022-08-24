const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
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
router.post('/', (req, res) => {
    
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
    
    // else {
    //   res.send("Access denied")
    // };
});

// DELETE A PRODUCT BY ID
router.delete("/:id", (req, res) => {
    // if (req.user.user_type === "admin"){
    try {
      con.query(`DELETE FROM products where product_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
//   }else {
//     res.send("Access denied")
//   };
});

// UPDATE A PRODUCT BY ID
router.put('/:id', (req, res) => {

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
});

module.exports = router;