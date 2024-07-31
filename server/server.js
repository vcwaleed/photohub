const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
require("./db/conn");
const router = require("./routes/router");
path.resolve()
app.use(express.static(path.join(__dirname, "public")));


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus:200,
  methods:["GET","POST","PUT","DELETE"]
}));



app.use(express.json());


// app.use(cookieParser())



app.use(router)








const port = 8000;


app.use("/uploads",express.static("./uploads"))

///////////////////////////////////



app.listen(port, () => {
  console.log(`listening on port ${port} `);
});





