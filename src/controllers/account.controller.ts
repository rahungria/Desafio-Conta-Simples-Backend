import { Request, Response, NextFunction } from "express";

import { AccountMongoModel, Accounts } from "@src/db/account.model.mongo";
import { StatementMongoModel, Statements } from "@src/db/statement.model.mongo";
import { IAccount, isAccount } from "@models/account.model";
import { isStatement, IStatement } from "@models/statement.model";

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

export const getFullStatement = (req: Request, res: Response, next: NextFunction) =>
{
  const id :number = +req.params.accountid;
  // id is NaN
  if (!id){
    return res.status(400).json({
      meta: {
        statusCode: 400,
        message: "Invalid ID"
      },
    })
  }

  

  return res.status(200).json({
    meta: {
      statusCode: 200,
      message: "template response"
    },
    content: {
      id: id
    }
  })
}

export const createStatements = (req: Request, res: Response, next: NextFunction) =>
{
  const statements: IStatement[] = req.body as IStatement[];
  // if statement data in body is malformed maybe remove of replace (sync...)
  for (let statement of statements){
    if (!isStatement(statement)){
      return res.status(400).json({
        meta: {
          statusCode: 400,
          message: "Invalid Statement"
        }
      })
    }
  }

  Statements.insertMany(statements)
    .then(
      (statements: StatementMongoModel[]) => {
        res.status(201).json({
          meta: {
            statusCode: 200,
            message: "Statements created"
          },
          content: {
            statements: statements
          }
        })
      }
      // insertMany fails
    , (reason) => {
      return res.status(400).json({
        meta: {
          statusCode: 400,
          message: "Statements couldn't be created",
          code: reason.code
        }
      })
    })
}