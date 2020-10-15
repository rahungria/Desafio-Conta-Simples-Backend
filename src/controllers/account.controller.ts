import { Request, Response, NextFunction } from "express";

import { AccountMongoModel, Accounts } from "@src/db/account.model.mongo";

/**
 * Fetches the balance from the logged-in account
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Express NextFunction
 */
export const getBalance = (req: Request, res: Response, next: NextFunction) =>
{
  // fetch account id set in authorization middleware
  const id: number = res.locals.accountID;
  
  Accounts.aggregate()
    .match({id: id})
    .project({_id:0, saldo: 1})
    .then( (document: AccountMongoModel[]|null) => {
      if (!document || document.length === 0){
        return res.status(404).json({
          meta: {
            statusCode: 404,
            message: "Account not found"
          }
        })
      }
      res.status(200).json({
        meta: {
          statusCode: 200,
          message: "Account found"
        },
        content: {
          saldo: document[0].saldo // array of documents (can't findOne)
        }
      })
    },
    (reason) => {
      return res.status(400).json({
        meta: {
          statusCode: 400,
          message: "Impossible to search for Account",
          code: reason.code
        }
      })
    })

  return res.status(200);
}

/**
 * Posts one account into the database
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Express NextFunction
 */
export const createAccount = (req: Request, res: Response, next: NextFunction) =>
{
  const acc : AccountMongoModel = new Accounts(req.body)

  // auto validates
  Accounts.create(acc)
    .then(
      (document: AccountMongoModel) => {
        return res.status(201).json({
          meta: {
            statusCode: 201,
            message: "Account created"
          },
          content: {
            account: document._id,
          }
        })
      }
    , (reason) => {
      console.log(reason);
      return res.status(400).json({
        meta: {
          statusCode: 400,
          message: "Impossible to create Account",
          errorCode: reason.code 
        }
      })
    })
}
