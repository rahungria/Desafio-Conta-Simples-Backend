import { Request, Response, NextFunction } from "express";
import bcrypt, {  } from "bcrypt"
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { IUser } from "@models/user.model";
import { Users } from "@src/db/user.model.mongo";
import { secrets } from "@src/secrets/secrets";

export const login = (req: Request, res: Response, next: NextFunction) =>
{  
  Users.findOne({username: req.body.username})
    .then(
      (document) => {

        if (!document){
          return res.status(404).json({
            meta: {
              statusCode: 404,
              message: "User not found"
            }
          })
        }
        // not properly chaining promises to keep document variable alive thoughout middleware
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
                  _id: document._id,
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
                  // normal flow
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
                });
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