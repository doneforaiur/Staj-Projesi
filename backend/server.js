const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const path = require('path');



require("dotenv").config({ path: "./dot.env" });

const app = express();
const port = process.env.PORT;

app.enable('trust proxy');

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
const Kullanici = require("./models/kullanici.model");

app.use("/api/bahisler", authenticateJWT, bahislerRouter); 
app.use("/api/kullanicilar", authenticateJWT, kullanicilarRouter);
app.use("/api/kuponlar", authenticateJWT, kuponlarRouter);
app.use("/api/yorumlar", authenticateJWT, yorumlarRouter);
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);

schedule.scheduleJob("0 0 * * * *", () => {
  console.log("Kupon kontrolü ve ödemeler.");
  let Kupon = require("./models/kupon.model");
  let Bahis = require("./models/bahis.model");
  let Kullanici = require("./models/kullanici.model");

  var now = Date.now();
  Kupon.find({ durum: "bekliyor" })
    .where("bitis_tarihi")
    .lt(now)
    .then((kuponlar) => {
      kuponlar.map((kupon) => {
        kupon.bahisler.map((bahis) => {
          console.log(bahis);
          kupon.durum == "tuttu";
          Bahis.findById(bahis.id)
            .then((_bahis) => {
              console.log(_bahis.durum, bahis.tahmin);
              if (_bahis.durum != bahis.tahmin) {
                kupon.durum = "tutmadı";
              }
            })
            .then(() => kupon.save());
        });
      });
    })
    .then(() => {
      Kupon.find({ durum: "tuttu" }).then((kuponlar) => {
        console.log(kuponlar);
        kuponlar.map((kupon) => {
          var toplam_oran = kupon.bahisler.reduce((oran, kup) => {
            return oran * kup.oran;
          }, 1);

          Kullanici.findById(kupon.kullanici_id).then((kullanici) => {
            kullanici.bakiye =
              kullanici.bakiye + Math.floor(kupon.tutar * toplam_oran);
            kullanici.save();
            kupon.durum = "ödendi";
            kupon.save();
          });
        });
      });
    });
});


app.use(express.static('../bilemezsin/build'));


app.listen(port, () => {
  console.log("server", port);
});
