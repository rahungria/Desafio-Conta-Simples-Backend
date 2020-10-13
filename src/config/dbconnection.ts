import mongoose, {  } from "mongoose";

const connect = (connString: string) => 
{
  // manage only single connection to one database
  return mongoose.connect(connString, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology: true})
}

export { connect }