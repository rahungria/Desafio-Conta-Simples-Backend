import { secrets } from "@src/secrets/secrets";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const jwt_validation = (req: Request, res: Response, next: NextFunction) => 
{
  // if no cookies at all or no needed cookie
  console.log("JWT Validation...")
  if (Object.keys(req.cookies).length == 0 || !req.cookies['jwt']){
    console.log("Required Cookie not found")
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
          console.log("Invalid Token:\n" + err);
          return res.status(401).json({
            meta: {
              statusCode: 401,
              message: "Invalid Token"
            }
          })
        }
        // flow normal token valido
        // mais alguma validação? talvez nao tenho certeza absoluta
        console.log("Valid Token. Proceeding...")
        next();
    })
  }
}