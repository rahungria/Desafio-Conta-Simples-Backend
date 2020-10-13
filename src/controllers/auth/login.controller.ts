import { Request, Response, NextFunction } from "express";
import bcrypt, {  } from "bcrypt"

import { IUser } from "@models/user.model";
import { Users } from "@src/db/user.model.mongo";

export const login = (req: Request, res: Response, next: NextFunction) =>
{
  console.log(`Login user: ${req.body.username}`);
  
  Users.findOne({username: req.body.username})
    .then(
      (document) => {

        if (!document){
          console.log("User not Found");

          return res.status(404).json({
            meta: {
              statusCode: 404,
              message: "User not found"
            }
          })
        }

        console.log(`User found!`);

        bcrypt.compare(req.body.password, document.password)
          .then(
            (matched) => {
              if (!matched){
                return res.status(401).json({
                  meta: {
                    statusCode: 401,
                    message: "Password not matching",
                  }
                })
              }

              // gen jwt token
              return res.status(200).json({
                meta: {
                  statusCode: 200,
                  message: "Login successful",
                },
                content: {
      
                }
              })
            }
          )
      }
    )
}

export const signup = (req: Request, res: Response, next: NextFunction) => 
{
  bcrypt.hash(req.body.password, 10)
    // password hashed successfully
    .then( 
    (hash) => {
      const user: IUser = {username: req.body.username, password: hash};

      return Users.create(user)
    },
    // Failed to hash password
    (reason) => {
      return res.status(500).json({
        meta: {
          statusCode: 500,
          message: reason,
        }
      })
    })
    // Document created successfully
    .then(
    (doc) => {
      console.log(`User created: ${doc}`);

      return res.status(201).json({
        meta: {
          statusCode: 201,
          message: "User created successfully",
        }
      })
    },
    // Document couldn't be created
    (reason) => {
      // Determine Error to give usefull message
      var message: string = "Unkown Error";

      if (reason.code === 11000){
        message = "User already exists";
      }
      return res.status(400).json({
        meta: {
          statusCode: 400,
          message: message,
        }
      })
    })
}