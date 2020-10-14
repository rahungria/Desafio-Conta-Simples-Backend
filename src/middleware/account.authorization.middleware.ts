import { UserMongoModel, Users } from "@src/db/user.model.mongo";
import { Request, Response, NextFunction } from "express";


export const authorizeAccountAccess = (req: Request, res: Response, next: NextFunction) => 
{
  const accountID :number = +req.params.accountID;
  const user_id: string = req.params.user_id;

  // no account id found
  if (!accountID){
    return res.status(400).json({
      meta: {
        statusCode: 400,
        message: "account ID not passed in parameters"
      }
    })
  }

  // didn't pass though authentication middleware
  if (!user_id){
    return res.status(400).json({
      meta: {
        statusCode: 400,
        message: "User not authenticated"
      }
    })
  }

  Users.findById(req.params.user_id)
    .then( (doc : UserMongoModel | null) => {
      // Weird case: jwt token is valid but the payload is invalid/doesn't exist in DB
      if (!doc) {
        return res.status(400).json({
          meta: {
            statusCode: 400,
            message: "Authenticated User Doesn't Exist."
          }
        })
      }

      // if the authenticated user doesn't have permission to access this account
      if (+doc.role.account !== accountID){
        return res.status(401).json({
          meta: {
            statusCode: 401,
            message: "User unauthorized to access this account"
          }
        })
      }
      // proceed
      next();
    })
}