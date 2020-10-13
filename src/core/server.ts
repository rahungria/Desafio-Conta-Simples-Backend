import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

let app = express();

// allow parsing of json from requests, etc
app.use(bodyparser.json());
// enable cors for the whole application
app.use(cors());

let port = process.env.PORT || 3000;

console.log(`Listening on Port: ${port}`);
app.listen(3000);