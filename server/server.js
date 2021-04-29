require('dotenv-flow').config();

const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const index = require("./routes/index");
const tasks = require("./routes/tasks");

const app = express();
const port = process.env.PORT || 8080;

//use cors mw
const corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

//body parser mw
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/", index);
app.use("/api", tasks);

app.listen(port, function() {
  console.log(`server started in port ${port}.`);
});
