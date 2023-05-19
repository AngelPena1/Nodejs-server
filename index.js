const express = require("express");
const cors = require("cors");
const db = require("./database/db.js");
const apiRouter = require("./routes/api/api.js");
const bodyParser = require("body-parser");
const corsOptions = require('./config/corsOptions.js')
const { logger } = require('./middlewares/logEvents.js')
const errorHandler = require('./middlewares/errorHandler.js')
const cookieParser = require('cookie-parser')
// const credentials = require('./middlewares/credentials.js')
const https = require('https')
const fs = require('fs');
const path = require("path");
const app = express();


app.use(logger)

// app.use(credentials)
app.use(cors());
// app.use(cors(corsOptions));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 100000,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(bodyParser.json());

// middleware for cookies
app.use(cookieParser())

app.use("/api/", apiRouter);

app.get('/', (req, res) => {
  res.json('Hola Mundo')
})


async function asyncCallDatabase() {
  try {
    await db.authenticate();
    console.log("Conexion exitosa a la DB");
  } catch (error) {
    console.log("Error al conectarse a la DB: " + error);
  }
}

asyncCallDatabase();

app.use(errorHandler)  

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(process.env.PORT || 8000, () => {
  console.log(`Server running with ssl on port ${process.env.PORT || 8000}`);
});

// app.listen(process.env.PORT || 8000, () => {
//   console.log(`Server running on port ${process.env.PORT || 8000}`);
// });

