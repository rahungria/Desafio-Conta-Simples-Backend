import { Request, Response, NextFunction } from "express";

import { StatementMongoModel, Statements } from "@src/db/statement.model.mongo";
import { isStatement, IStatement } from "@models/statement.model";


// maybe use a cursor and an iterator?
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
  // Filter by date and filter by paymentType (credit debit)
  // permissive of unknown parameters by ignoring
  let sortbydate: boolean = false;
  const filter: {[key:string]:any} = {account_id: id};
  // payment type query specified
  if (req.query.paymentType){
    if (req.query.paymentType === "credit"){
      filter.credito = true
    }
    else if (req.query.paymentType === "debit"){
      filter.credito = false;
    }
  }
  // sort by date query specified
  if (req.query.sortByDate) {
    if (req.query.sortByDate === "true"){
      sortbydate = true;
    }
  }

  // return to user the possible queries for discovery
  const validQuery = {
    "paymentType": ["credit", "debit"],
    "sortByDate": ["true"]
  }

  Statements.find(filter)
    .then(
      (statements: StatementMongoModel[]) => {
        // not found any statements
        if (!statements || statements.length === 0){
          return res.status(404).json({
            meta: {
              statusCode: 404,
              message: "No statements could be found" 
            }
          })
        }
        
        if (sortbydate){
          statements = statements.sort( (a,b) => {
            return a.dataTransacao.getUTCDate() - b.dataTransacao.getUTCDate();
          })
        }

        return res.status(200).json({
          meta: {
            statusCode: 200,
            message: "Statements found",
            validQuery: validQuery
          },
          content: {
            // maybe return only the ids
            statements: statements
          }
        })
      }
    )
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