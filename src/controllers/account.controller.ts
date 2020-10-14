import { AccountMongoModel, Accounts } from "@src/db/account.model.mongo";
import { IAccount, isAccount } from "@src/model/account.model";
import { Request, Response, NextFunction } from "express";

export const getSaldo = (req: Request, res: Response, next: NextFunction) =>
{
  const accID: number = +req.params.accountID;
  Accounts.findOne({account_id: accID})
    .then( (document: AccountMongoModel|null) => {
      console.log(document);
    })

  return res.status(200);
}

export const createAccount = (req: Request, res: Response, next: NextFunction) =>
{
  const acc : IAccount = req.body as IAccount;
  if (!isAccount(acc)){
    return res.status(400).json({
      meta: {
        statusCode: 400,
        message: "Invalid account passed"
      }
    })
  }

  console.log(acc);
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