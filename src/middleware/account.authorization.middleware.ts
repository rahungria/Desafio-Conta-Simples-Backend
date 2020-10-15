import { UserMongoModel, Users } from "@src/db/user.model.mongo";
import { Request, Response, NextFunction } from "express";


/**
 * Authorizes logged in account to it's account. 
 * If accountID passed in params attemps to premptively authorize/deauthorize, 
 * otherwise just puts authorized accountID in params and continues
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Express Next Function
 */
export const authorizeAccountAccess = (req: Request, res: Response, next: NextFunction) => 
{
  let accountID :number = +req.params.accountID; //optional
  const user_id: string = res.locals.user_id;

  console.log("req.params: ");
  console.log(req.query);  

  // no account id found
  // if (!accountID){
  //   return res.status(400).json({
  //     meta: {
  //       statusCode: 400,
  //       message: "account ID not passed in parameters"
  //     }
  //   })
  // }

  // didn't pass though authentication middleware
  if (!user_id){
    return res.status(400).json({
      meta: {
        statusCode: 400,
        message: "User not authenticated"
      }
    })
  }

  Users.findById(user_id)
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

      // if accountID to be accessed was passed in Request
      if (accountID){
        // attempts to authorize
        if (+doc.role.account !== accountID){
          return res.status(401).json({
            meta: {
              statusCode: 401,
              message: "User unauthorized to access this account"
            }
          })
        }
      }
      else {
        accountID = doc.role.account
      }
      // store authorized account in locals
      res.locals.accountID = accountID;
      next();
    })
}