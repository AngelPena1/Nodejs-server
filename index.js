const express = require("express");
const cors = require("cors");
const db_dataview = require("./database/db_dataview.js");
const db_pixel = require("./database/db_pixel.js");
const apiRouter = require("./routes/api/api.js");
const bodyParser = require("body-parser");
const corsOptions = require("./config/corsOptions.js");
const { logger } = require("./middlewares/logEvents.js");
const errorHandler = require("./middlewares/errorHandler.js");
const cookieParser = require("cookie-parser");
// const credentials = require('./middlewares/credentials.js')
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(logger);

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
app.use(bodyParser.text({ type: 'text/xml' }));


// middleware for cookies
app.use(cookieParser());

app.use("/api/", apiRouter);

app.get("/", (req, res) => {
  res.json("Hola Mundo");
});

async function asyncCallDatabaseDataview() {
  try {
    await db_dataview.authenticate();
    console.log("Conexion exitosa a la db_dataview");
  } catch (error) {
    console.log("Error al conectarse a la db_dataview: " + error);
  }
}

asyncCallDatabaseDataview();

async function asyncCallDatabasePixel() {
  try {
    await db_pixel.authenticate();
    console.log("Conexion exitosa a la db_pixel");
  } catch (error) {
    console.log("Error al conectarse a la db_pixel: " + error);
  }
}

asyncCallDatabasePixel();

app.use(errorHandler);

// try {
//   const sslServer = https.createServer(
//     {
//       key: fs.readFileSync(path.join(__dirname, "nodejs.net", "privkey2.pem")),
//       cert: fs.readFileSync(path.join(__dirname, "nodejs.net", "cert2.pem")),
//     },
//     app
//   );

//   sslServer.listen(process.env.PORT || 8000, () => {
//     console.log(`Server running with ssl on port ${process.env.PORT || 8000}`);
//   });
// } catch (error) {
//   console.error(error);
// }

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`);
});
