const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM users", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

// GET A SINGLE USER BY ID
router.get("/:id", (req, res) => {
    try {
      con.query(
        `SELECT * FROM users where user_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

// ADD A USER
router.post("/", (req, res) => {
    const {
        full_name,
        email,
        password,
        address,
        phone,
        bio,
    } = req.body;
    try {
      con.query(
        `INSERT INTO users (full_name, email, password, address, phone, bio) values ('${full_name}', '${email}', '${password}', '${address}', '${phone}', '${bio}')`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(err);
    }
});

// DELETE A USER BY ID
router.delete("/:id", (req, res) => {
    try {
      con.query(
        `DELETE FROM users where user_id = ${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

// UPDATE A USER BY ID
router.put("/:id", (req, res) => {
    const {
        full_name,
        email,
        password,
        address,
        phone,
        bio,
    } = req.body;
    try {
      con.query(
        `UPDATE users set full_name='${full_name}', email='${email}', password='${password}', address='${address}', phone='${phone}', bio='${bio}' WHERE user_id=${req.params.id}`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(err);
    }
});

module.exports = router;