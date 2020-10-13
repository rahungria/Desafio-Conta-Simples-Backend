import cors from "cors";
import express from "express";
import bodyparser from "body-parser";

import { connect } from "@configs/dbconnection";
import { secrets } from "@src/secrets/secrets";

let app = express();

app.use(bodyparser.json());   // allow parsing of json from requests, etc
app.use(cors());              // enable cors for the whole application

connect(secrets.mongo_connection_string)
  .then( (connection) => {
    console.log("Connection Successfull");
  })
  .catch( (reason) => {
    console.log("Connection Failed");
  })

let port = process.env.PORT || 3000;

console.log(`Listening on Port: ${port}`);
app.listen(3000);