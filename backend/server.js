const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config({path:'./dot.env'});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("mongodb bağlandı")
})

const bahislerRouter = require('./routes/bahisler');
const kullanicilarRouter = require('./routes/kullanicilar');
const kuponlarRouter = require('./routes/kuponlar');
const yorumlarRouter = require('./routes/yorumlar');


app.use('/bahisler', bahislerRouter);
app.use('/kullanicilar', kullanicilarRouter);
app.use('/kuponlar', kuponlarRouter);
app.use('/yorumlar', yorumlarRouter);




app.listen(port, ()=> {
  console.log('server');
});