import { Request, Response, NextFunction } from "express";

import { AccountMongoModel, Accounts } from "@src/db/account.model.mongo";
import { IAccount, isAccount } from "@models/account.model";

export const getSaldo = (req: Request, res: Response, next: NextFunction) =>
{
  const id: number = +req.params.id;
  // maybe search by _id (difficult to debug via postman)
  Accounts.findOne({id: id})
    .then( (document: AccountMongoModel|null) => {
      if (!document){
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
          saldo: document.saldo
        }
      })
    },
    (reason) => {
      return res.status(400).json({
        meta: {
          statusCode: 400,
          message: "Impossible to search for Account"
        }
      })
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
