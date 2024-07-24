import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import session from "express-session";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(
  session({
    key: "email",
    secret: "pnumber",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 10 * 1000, // 10 minutes
    },
  })
);

const db = mysql.createConnection({
  database: "rentify",
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Mysql@1",
});

db.connect((err) => {
  if (err) {
    console.error("Error in database connection:", err);
  } else {
    console.log("Database connected successfully");
  }
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("We need token, give it next time");
  } else {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to authenticate" });
      } else {
        req.mail = decoded.email; // Corrected from req.mail to req.email
        next();
      }
    });
  }
};

app.get("/isAuth", verifyJWT, (req, res) => {
  const email = req.email; // Corrected from req.mail to req.email
  const query = "SELECT id, email, pnumber FROM user WHERE email=?";
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length > 0) {
      res.json({ auth: true, result });
    } else {
      res.status(401).json({ auth: false, message: "User not found" });
    }
  });
});

app.post("/signup", (req, res) => {
  const { firstname, lastname, email, pnumber } = req.body;

  // Validate inputs
  if (!firstname || !lastname || !email || !pnumber) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const checkemail = "SELECT * FROM user WHERE email=?";
  db.query(checkemail, [email], (err, data) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this email already registered" });
    }

    const sqlinsert =
      "INSERT INTO user (firstname, lastname, email, pnumber) VALUES (?, ?, ?, ?)";
    db.query(
      sqlinsert,
      [firstname, lastname, email, pnumber],
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log(result);
        res.status(200).send("Data inserted successfully");
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { email, pnumber } = req.body;

  if (!email || !pnumber) {
    return res.json({
      Status: "Error",
      Error: "Please enter both email and pnumber.",
    });
  }

  const sqlselect = "SELECT * FROM user WHERE email=?";
  db.query(sqlselect, [email], (err, data) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.json({ Error: "Internal Email Error" });
    }

    if (data.length > 0) {
      try {
        const storedPnumber = data[0].pnumber;
        if (storedPnumber === pnumber) {
          const token = jwt.sign(
            {
              email: data[0].email,
              pnumber: data[0].pnumber,
              id: data[0].id,
            },
            "secret",
            { expiresIn: "1h" }
          );
          return res
            .cookie("AccessToken", token, {
              httpOnly: true,
              secure: true,
            })
            .json({
              auth: true,
              token,
              result: data[0],
              message: "Login Successful",
            });
        } else {
          return res.json({ Error: "Pnumber not matched" });
        }
      } catch (error) {
        return res.json({ Error: `Internal Logging Error ${error}` });
      }
    } else {
      return res.json({ Error: "Email Not Existed" });
    }
  });
});

app.post("/create-listing", (req, res) => {
  const {
    name,
    description,
    address,
    is_sell,
    is_rent,
    is_parking,
    is_furnished,
    is_offer,
    num_bedrooms,
    num_bathrooms,
    regular_price,
    discounted_price,
  } = req.body;

  const query = `
      INSERT INTO createlisting (
        name, description, address, is_sell, is_rent, is_parking, is_furnished, is_offer, num_bedrooms, num_bathrooms, regular_price, discounted_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  db.query(
    query,
    [
      name,
      description,
      address,
      is_sell ? 1 : 0,
      is_rent ? 1 : 0,
      is_parking ? 1 : 0,
      is_furnished ? 1 : 0,
      is_offer ? 1 : 0,
      num_bedrooms,
      num_bathrooms,
      regular_price,
      discounted_price,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting listing:", err);
        return res
          .status(500)
          .json({ error: "Internal server error", details: err.message });
      }
      res.status(201).json({
        message: "Listing created successfully",
        listingId: result.insertId,
      });
    }
  );
});

app.get("/listings", async (req, res) => {
  try {
    const {
      search = "",
      all = "false",
      rent = "false",
      sale = "false",
      offer = "false",
      parking = "false",
      furnished = "false",
      sort_order = "Price high to low",
    } = req.query;

    let query = "SELECT * FROM createlisting WHERE 1=1";

    if (search) {
      query += ` AND (name LIKE ? OR description LIKE ?)`;
    }

    if (all === "true") {
      query += ` AND (is_sell=1 OR is_rent=1)`;
    } else {
      if (rent === "true") query += ` AND is_rent=1`;
      if (sale === "true") query += ` AND is_sell=1`;
    }

    if (offer === "true") query += ` AND is_offer=1`;
    if (parking === "true") query += ` AND is_parking=1`;
    if (furnished === "true") query += ` AND is_furnished=1`;

    switch (sort_order) {
      case "Price high to low":
        query += " ORDER BY regular_price DESC";
        break;
      case "Price low to high":
        query += " ORDER BY regular_price ASC";
        break;
      case "Latest":
        query += " ORDER BY id DESC";
        break;
      case "Oldest":
        query += " ORDER BY id ASC";
        break;
      default:
        break;
    }

    db.query(query, [`%${search}%`, `%${search}%`], (err, results) => {
      if (err) {
        console.error("Error fetching listings:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

app.post("/like-listing/:id", (req, res) => {
  const { id } = req.params;

  const query =
    "UPDATE createlisting SET like_count = like_count + 1 WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error updating like count:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "Like count updated successfully" });
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
