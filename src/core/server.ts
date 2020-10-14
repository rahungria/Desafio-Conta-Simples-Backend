import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { connect } from "@configs/dbconnection";
import { secrets } from "@src/secrets/secrets";
import { router } from "@cores/router";
import { exit } from "process";

let app = express();

app.use(bodyParser.json());   // allow parsing of json from requests, etc
app.use(cors());              // enable cors for the whole application
app.use(cookieParser())       // enable cookie sending and parsing

// connect to mongodb, maybe separate the promise here
connect(secrets.mongo_connection_string)
  .then( (connection) => {
    console.log("Connection Successfull");
  })
  .catch( (reason) => {
    console.log("Connection Failed...\nExiting");
    exit(-1);
  })

let port = process.env.PORT || 3000;

// Apply core router
app.use(router);

console.log(`Listening on Port: ${port}`);
app.listen(3000);