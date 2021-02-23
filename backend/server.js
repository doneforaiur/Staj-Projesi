const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");

require("dotenv").config({ path: "./dot.env" });

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const accessTokenSecret = process.env.JWT_TOKEN;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb bağlandı");
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const bahislerRouter = require("./routes/bahisler");
const kullanicilarRouter = require("./routes/kullanicilar");
const kuponlarRouter = require("./routes/kuponlar");
const yorumlarRouter = require("./routes/yorumlar");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");

app.use("/bahisler", authenticateJWT, bahislerRouter); // Anasayfada görülebilmesi için JWT yok
app.use("/kullanicilar", authenticateJWT, kullanicilarRouter);
app.use("/kuponlar", authenticateJWT, kuponlarRouter);
app.use("/yorumlar", authenticateJWT, yorumlarRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

schedule.scheduleJob("* * * * *", () => {
  let Kupon = require("./models/kupon.model");
  var now = Date.now();
  Kupon.find()
    .where("bitis_tarihi")
    .lt(now)
    .where("durum")
    .equals("bekliyor")
    .then((bahisler) => {
      console.log(bahisler);
    });
});

app.listen(port, () => {
  console.log("server");
});
