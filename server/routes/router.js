const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment")

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey = "";


const nodemailer = require('nodemailer');

const stripe = require("stripe")("");


////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////hiring form table ////////////////////////

// Create a hiring request

router.post('/hire', (req, res) => {
  const { userName, location, budget, eventTime, eventDate, phoneNumber, userId, email } = req.body;
  
  // Check if location is provided and not null or empty
  if (!location || location.trim() === '') {
    return res.status(400).send('Location is required');
  }

  const hiringRequest = { userName, location, budget, eventTime, eventDate, phoneNumber, user_id: userId, email ,status: 0};
  const sql = 'INSERT INTO hiring_request SET ?';

  conn.query(sql, hiringRequest, (err, result) => {
    if (err) {
      res.status(500).send('Error creating hiring request');
      throw err;
    }
    res.status(201).send('Hiring request created successfully');
  });
});

  
  
router.get('/hiring_requests', authenticateToken, (req, res) => {
  const userId = req.query.userId;  // Assuming user ID is stored in the JWT payload

  const sql = `
    SELECT * 
    FROM hiring_request 
    WHERE user_id = ?
  `;

  conn.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving hiring requests:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({status: 'success',hiringRequests:results});
  });
});




router.get('/Adminhiring_requests', (req, res) => {
  const sql = 'SELECT * FROM hiring_request';

  conn.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving hiring requests');
      throw err;
    }
    res.json(results);
  });
});


  router.put('/Adminhiring_requests/:id', (req, res) => {
    const requestId = req.params.id;
    const { status } = req.body;
  
    const sql = 'UPDATE hiring_request SET status = ? WHERE id = ?';
    conn.query(sql, [status, requestId], (err, result) => {
      if (err) {
        console.error('Error updating status:', err);
        res.status(500).send('Error updating status');
        return;
      }
      console.log('Status updated successfully');
      res.status(200).send('Status updated successfully');
    });
  });

  
/////////////////////////////////////////////////////////////////////////////////////////
                          
////////////////////////////////////////////////////////////////////////////////////////





//image api 
// img storage confing
var imgconfig = multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,"./uploads");
  },
  filename:(req,file,callback)=>{
      callback(null,`image-${Date.now()}.${file.originalname}`)
  }
});


// img filter
const isImage = (req,file,callback)=>{
  if(file.mimetype.startsWith("image")){
      callback(null,true)
  }else{
      callback(null,Error("only image is allowd"))
  }
}

var upload = multer({
  storage:imgconfig,
  fileFilter:isImage
})

router.post("/upload", upload.single("photo"), (req, res) => {
  const { fname, category } = req.body;
  const { filename } = req.file;

  if (!fname || !filename || !category) {
      return res.status(422).json({ status: 422, message: "Fill all the details" });
  }
  
  try {
      let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      
      conn.query("INSERT INTO usersdata SET ?", {
          username: fname,
          userimg: filename,
          category: category,
          date: date
      }, (err, result) => {
          if (err) {
              console.error("Error inserting data:", err);
              return res.status(500).json({ status: 500, message: "Internal Server Error" });
          } else {
              console.log("Data added successfully");
              return res.status(201).json({ status: 201, message: "User data added successfully", data: req.body });
          }
      });
  } catch (error) {
      console.error("Error:", error);
      return res.status(422).json({ status: 422, message: "Unprocessable Entity" });
  }
});


// get user data
router.get("/getdata",(req,res)=>{
  try {
      conn.query("SELECT * FROM usersdata",(err,result)=>{
          if(err){
              console.log("error")
          }else{
              console.log("data get")
              res.status(201).json({status:201,data:result})
          }
      })
  } catch (error) {
      res.status(422).json({status:422,error})
  }
});

////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////



router.get('/computer-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Computer'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Computer images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});


router.get('/couple-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Couple'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Couple images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});


router.get('/culture-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Culture'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Culture images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
router.get('/family-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Family'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Family images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});


router.get('/farmer-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Farmer'", (err, result) => {
      if (err) {
        console.error("Error fetching farmer images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Farmer images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});



router.get('/doctor-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Doctor'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Doctor images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});


router.get('/festivals-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Festivals'", (err, result) => {
      if (err) {
        console.error("Error fetching festival images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Festivals images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//

router.get('/food-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Food'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Food images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
//

router.get('/ideology-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Idelogy'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Ideology images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
//


router.get('/jewelry-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Jewelry'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Jewelry images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//


router.get('/kitchen-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Kitchen'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Kitchen images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});


router.get('/outdoor-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Outdoor'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Outdoor images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
//


router.get('/people-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'People'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("People images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

///


router.get('/religion-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Religion'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Religion images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//
router.get('/boys-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Boys'", (err, result) => {
      if (err) {
        console.error("Error fetching Boys images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Boys images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

////

router.get('/girls-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Girls'", (err, result) => {
      if (err) {
        console.error("Error fetching Girls images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Girls images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//


router.get('/shopping-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Shopping'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Doctor images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

///


router.get('/sports-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Sports'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Sports images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/students-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Students'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Doctor images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});



router.get('/traditions-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Traditions'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Doctor images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});
router.get('/photographer-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Photographer'", (err, result) => {
      if (err) {
        console.error("Error fetching photographer images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("photographer images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});


// 


router.get('/travel-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Travel'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Doctor images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

//

router.get('/wedding-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Wedding'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Wedding images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

router.get('/ag-images', (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata WHERE category = 'Ag'", (err, result) => {
      if (err) {
        console.error("Error fetching doctor images:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Farmer images fetched successfully");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

////////////////////////////////////////////////////////////////////////////
//////////////////////////////login /////////////////////////////////////
////////////////////////////////////////////////////////////////////////


router.use(cookieParser());
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Extract the token from the "Bearer <token>" format
  const authToken = token.split(' ')[1];

  jwt.verify(authToken, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbiddensss' });
    }
    req.user = user;
    next();
  });
}



router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  // Assign a default value of '0' to role if it's not provided
  const userRole = role || '0';

  // Generate salt
  bcrypt.genSalt(10, (err, salt) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error generating salt" }); // Use res.status() for status codes
      }

      // Hash the password
      bcrypt.hash(password.toString(), salt, (err, hash) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: "Error hashing password" });
          }

          const sql = "INSERT INTO login (name, email, password, role) VALUES (?, ?, ?, ?)";
          const values = [name, email, hash, userRole];

          // Insert into the database
          conn.query(sql, values, (err, result) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ error: "Error inserting data into the database" });
              }

              console.log('Registered user successfully:', email);
              return res.status(200).json({ status: "success" }); // Use res.status() for status codes
          });
      });
  });
});

router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE email=?';

  conn.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error("Login error in server:", err);
      return res.status(500).json({ Error: "Login error in server" });
    }

    if (data.length > 0) {
      const storedHashedPassword = data[0].password;

      bcrypt.compare(req.body.password.toString(), storedHashedPassword, (err, response) => {
        if (err) {
          console.error("Password compare error:", err);
          return res.status(500).json({ Error: "Password compare error" });
        }

        if (response) {
          const name = data[0].name;
          const userId = data[0].id;
          const email= data[0].email;
          const role = data[0].role;

          const token = jwt.sign({ userId, name ,email ,role }, secretKey, { expiresIn: '5d' });

          // Return the token in the response
          res.json({ Status: "success", token,role });
        } else {
          return res.status(401).json({ Error: "Invalid credentials" });
        }
      });
    } else {
      return res.status(404).json({ Error: "No email existed" });
    }
  });
});



router.post("/orderplace", (req, res) => {
  const { product_id, user_id, quantity } = req.body;

  if (!product_id || !user_id || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  const sql = 'INSERT INTO `orderdetail` (user_id, product_id, quantity) VALUES (?, ?, ?)';
  const values = [user_id, product_id, quantity];

  conn.query(sql, values, (error, results) => {
      if (error) {
          console.error('Error adding item to order detail:', error);
          return res.status(500).json({ message: 'Error adding item to order detail' });
      }

      const message = results.affectedRows === 1 ? 'Item added to order detail successfully' : 'Failed to add item to order detail';
      return res.status(results.affectedRows === 1 ? 200 : 500).json({ message });
  });
});

router.get('/orderdetails',authenticateToken, (req, res) => {
  const userId = req.query.userId; 
  const sql = `
    SELECT od.id, od.user_id, od.product_id, od.quantity, ud.userimg, ud.category
    FROM orderdetail od
    JOIN usersdata ud ON od.product_id = ud.id
    WHERE od.user_id = ?
  `;

  conn.query(sql, [userId], (err, data) => {
    if (err) {
      console.error('Error fetching order details:', err);
      return res.status(500).json({ Error: 'Internal server error' });
    }

    res.json({ status: 'success', orderDetails: data });
  });
});



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////



//email api 
router.post("/email", (req, res) => {
    const { email } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'photohub62@gmail.com',
                pass: 'tnpf iirk mkcm ftgq'
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Request status changed",
            html: '<h1>Congratulations</h1><h2>your request status is change go and check </h2>   <h3>for more detail visit our site photohub  </h3> <h4> send your request at photohub62@gmail.com<h4>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error:", error);
                res.status(500).json({ status: 500, error: "Error sending email" });
            } else {
                console.log("Email sent:", info.response);
                res.status(201).json({ status: 201, message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: 500, error: "Internal server error" });
    }
});



router.get('/allusers', (req, res) => {
  const sql = "SELECT * FROM login";
  conn.query(sql, (err, result) => {
      if (err) {
          res.status(500).send('error in retrieving data from database');
          throw err;
      }
      res.send(result);
  });
});



router.delete('/allusers/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM login WHERE id = ?";
  conn.query(sql, userId, (err, result) => {
      if (err) {
          res.status(500).send('Error deleting user');
          throw err;
      }
      res.send(`User with ID ${userId} deleted successfully`);
  });
});



router.delete('/deleteItem/:id', (req, res) => {
  const itemId = req.params.id;
  const sql = "DELETE FROM usersdata WHERE id = ?";
  conn.query(sql, itemId, (err, result) => {
      if (err) {
          res.status(500).send('Error deleting item');
          throw err;
      }
      res.send({ message: "Item deleted successfully" });
  });
});



router.get('/usersCount', (req, res) => {
  conn.query('SELECT COUNT(*) AS count FROM login', (error, results, fields) => {
    if (error) throw error;
    const count = results[0].count;
    res.json({ count });
  });
});

router.get('/productsCount', (req, res) => {
conn.query('SELECT COUNT(*) AS count FROM usersdata ', (error, results, fields)=>
{

  if (error) throw error;
  const count = results[0].count;
  res.json({ count });
});

});

router.get('/orderCount',(req,res)=>{

conn.query('SELECT COUNT(*) AS count FROM orderdetail', (error, results, fields)=>
{

  if (error) throw error;
  const count = results[0].count;
  res.json({ count });
});

});

router.get('/hiringcount' , (req ,res)=>{
conn.query('SELECT COUNT(*) AS count FROM hiring_request', (error, results, fields)=>{

  if (error) throw error;
  const count = results[0].count;
  res.json({ count });
  

});

});



router.delete('/deleteorderdetails/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  
  const sql = 'DELETE FROM orderdetail WHERE id = ?';

  conn.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error('Error deleting order item:', err);
      return res.status(500).json({ error: 'Error deleting order item' });
    }
    if (result.affectedRows === 0) {
      // No rows affected, meaning no matching order found
      return res.status(404).json({ error: 'Order item not found' });
    }
    console.log('Order item deleted successfully');
    res.status(200).json({ message: 'Order item deleted successfully' });
  });
});


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


//payment module integration 

// router.post("/create-checkout-session",async(req,res)=>{
//   const {products} = req.body;
//   const {totalPrice} = req.body;
//   console.log(products);
//   console.log("total price",totalPrice);

//   const lineItems = products.map((product)=>({
//     price_data:{
//         currency:"pk",
//         product_data:{
//             name:product.category,
//             images:[product.userimg]
//         },
//         unit_amount: totalPrice * 100,
//     },
//     quantity:product.quantity
// }));

// const session = await stripe.checkout.sessions.create({
//   payment_method_types:["card"],
//   line_items:lineItems,
//   mode:"payment",
//   success_url:"http://localhost:3000/success",
//   cancel_url:"http://localhost:3000/cancle",
// });

// res.json({id:session.id})

// });

router.post("/create-checkout-session", async (req, res) => {
  const { products, totalPrice } = req.body;
  console.log(products);
  
  // Ensure the total price is at least 50 cents
  if (totalPrice < 0.50) {
    return res.status(400).json({ error: "Total amount must be at least 50 cents." });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.category,
       
      },
      unit_amount:1* 100,
    },
    quantity:1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});


// DELETE a hiring request by ID
router.delete("/hiring_requests/:id", (req, res) => {
  const requestId = req.params.id;

  // SQL query to delete a hiring request by ID
  const sql = `DELETE FROM hiring_request WHERE id = ?`;

  conn.query(sql, [requestId], (err, result) => {
      if (err) {
          console.error('Error deleting hiring request:', err);
          res.status(500).json({ error: "Internal server error" });
      } else if (result.affectedRows === 0) {
          // If no rows were affected, it means the request with the given ID doesn't exist
          res.status(404).json({ error: "Hiring request not found" });
      } else {
          // If the request was successfully deleted
          res.status(200).json({ message: "Hiring request deleted successfully" });
          console.log("Hiring request deleted successfully");
      }
  });
});




///////////////////////////////////////////Photographers //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/photographer_request', (req, res) => {
  // Parse the request body
  const { name, email, address, city, cameraName, lensName, phoneNumber, experience, socialMedia, gender, userId } = req.body;

  // Construct the SQL query
  const query = `INSERT INTO photographers (name, email, address, city, cameraName, lensName,  phoneNumber, experience, socialMedia, gender, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query
  conn.query(query, [name, email, address, city, cameraName, lensName, phoneNumber, experience, socialMedia, gender, userId], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error storing data in the database');
          return;
      }
    
      res.status(200).send('Data stored successfully');
  });
});



router.get('/photographer_requests', (req, res) => {
  conn.query('SELECT * FROM photographers', (err, results) => {
    if (err) {
      console.error('Error fetching photographer requests:', err);
      res.status(500).send('Error fetching photographer requests');
      return;
    }
    res.status(200).json(results);
  });
});


router.delete('/photographer_requests/:id', (req, res) => {
  const requestId = req.params.id;

  // Construct the SQL query to delete the photographer request
  const query = 'DELETE FROM photographers WHERE id = ?';

  // Execute the query
  conn.query(query, [requestId], (err, result) => {
      if (err) {
          console.error('Error deleting photographer request:', err);
          res.status(500).send('Error deleting photographer request');
          return;
      }
      res.status(200).send('Photographer request deleted successfully');
  });
});router.put('/update_role/:id', (req, res) => {
  const userId = req.params.id;

  // Construct the SQL query to update the role column
  const query = 'UPDATE login SET role = 2 WHERE id = ?';

  // Execute the query
  conn.query(query, [userId], (err, result) => {
      if (err) {
          console.error('Error updating role:', err);
          res.status(500).send('Error updating role');
          return;
      }
      res.status(200).send('Role updated successfully');
  });
});


///////////////////////////////////////////Upload Photo by photographers //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/addimage', (req, res) => {
  // Parse the request body
  console.log(req.body);
  const { title, description, rating, image, userId} = req.body;

  // Construct the SQL query
  const query = 'INSERT INTO photos (image, title, description, rating, user_id) VALUES (?, ?, ?, ?, ?)';

  // Execute the query
  conn.query(query, [image, title, description, rating, userId], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error storing data in the database');
          return;
      }
    
      res.status(200).send('Data stored successfully');
  });
});


///**********Get All Photographers********* */
router.get('/photographers', (req, res) => {
  const sql = `
  SELECT *
  FROM login where role =2
`;
conn.query(sql, (err, results) => {
  if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }

  res.status(200).json(results);
});
});



///**********Get Photos********* */
router.get('/images/:id', (req, res) => {
  const requestId = req.params.id;
  const sql = `
  SELECT *
  FROM photos WHERE user_id = ?
`;
conn.query(sql,[requestId], (err, results) => {
  if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }

  if (results.length === 0) {
      return res.status(200).json([]);
  }

  res.status(200).json(results);
});
});

module.exports = router;

/////////////////////////////////////////////Add Rattingse ////////////////////////


router.post('/addratting', (req, res) => {
  const { imageId, rating } = req.body;

    // Fetch existing ratings for the image from the database
    const getRatingsSql = 'SELECT rating FROM photos WHERE image = ?';
    conn.query(getRatingsSql, [imageId], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Calculate the new average rating
        const existingRatings = rows.map(row => row.rating);
        const totalRatings = existingRatings.length;
        const newAverageRating = (existingRatings.reduce((acc, cur) => acc + cur, 0) + rating) / (totalRatings + 1);

        // Update the image's rating in the database with the new average rating
        const updateRatingSql = 'UPDATE photos SET rating = ? WHERE image = ?';
        conn.query(updateRatingSql, [newAverageRating, imageId], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log('Rating added successfully');
            res.status(200).json({ message: 'Rating added successfully' });
        });
    });
});
