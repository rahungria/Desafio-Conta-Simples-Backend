import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { secrets } from "@src/secrets/secrets";
import { AuthJWT } from "@models/authenticationJWT.model";

export const jwt_authentication = (req: Request, res: Response, next: NextFunction) => 
{
  // if no cookies at all or no needed cookie
  if (Object.keys(req.cookies).length == 0 || !req.cookies['jwt']){
    // fail the request completely
    return res.status(401).json({
      meta: {
        statusCode: 401,
        message: "Authentication Required",
      }
    })
  }

  // jwt validate...
  if (req.cookies['jwt']){
    jwt.verify(
      req.cookies['jwt'], 
      secrets.jwt_secret, 
      (err :Error|null, decoded:object|undefined) => {
        // erro validando o verify
        if (err){
          // talvez checkar para todos os erros possiveis
          return res.status(401).json({
            meta: {
              statusCode: 401,
              message: "Invalid Token"
            }
          });
        }
        const token = decoded as AuthJWT;
        if (!token) {
          return res.status(401).json({
            meta: {
              statusCode: 401,
              message: "Invalid Token Payload"
            }
          });
        }
        // flow normal token valido
        // authorization: put decoded user on request and forward
        res.locals.user_id = token.user_id;
        next();
    })
  }
}