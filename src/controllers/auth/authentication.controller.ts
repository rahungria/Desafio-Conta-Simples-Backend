import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { UserMongoModel, Users } from "db/user.model.mongo";
import { secrets } from "secrets/secrets";

export const login = (req: Request, res: Response, next: NextFunction) =>
{  
  Users.findOne({username: req.body.username})
    .then(
      (document) => {
        // document not found
        if (!document){
          return res.status(404).json({
            meta: {
              statusCode: 404,
              message: "User not found"
            }
          })
        }
        // not properly chaining promises to keep 'document' variable from 'findOne' in scope thoughout function
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
              
              const jwt_timeout: number = 1000 * 60 * 60; // 1 min
              jwt.sign(
                {
                  exp: Math.floor(Date.now() / 1000) + jwt_timeout/1000,
                  user_id: document._id,
                }, 
                secrets.jwt_secret,
                // async signing of the jwt
                (err: Error|null, token: string|undefined) => {
                  // weird server side error
                  if (err){
                    return res.status(500).json({
                      meta: {
                        statusCode: 500,
                        message: "Failed Signin Session Token",
                      }
                    })
                  }
                  // set jwt token as cookie
                  res.cookie(
                    "jwt",
                    token,
                    {
                      httpOnly: true,
                      maxAge: jwt_timeout,
                      signed: false
                    }
                  );
                  return res.status(200).json({
                    meta: {
                      statusCode: 200,
                      message: "Login successful",
                    }
                  });
                }
              );
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

      const user: UserMongoModel = new Users({
        username: req.body.username,
        password: hash,
        role: req.body.role
      }); 

      // validates
      return Users.create(user);
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
      return res.status(201).json({
        meta: {
          statusCode: 201,
          message: "User created successfully",
        },
        content: {
          user: (doc as UserMongoModel)._id,
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
          message: reason.message,
        }
      })
    })
}