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
          })
        }
        // flow normal token valido
        // mais alguma validação? talvez nao tenho certeza absoluta
        // authorization: put decoded user on request and forward
        req.params.user_id = (<AuthJWT>decoded)?.user_id;
        console.log(req.params.user_id);
        next();
    })
  }
}