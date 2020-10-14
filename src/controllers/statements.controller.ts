import { Request, Response, NextFunction } from "express";

import { StatementMongoModel, Statements } from "@src/db/statement.model.mongo";
import { isStatement, IStatement } from "@models/statement.model";
import { extractAccountID, extractFilterSortQuery, validateStatements } from "@src/shared/statements.shared";


// maybe use a cursor and an iterator?
export const getFullStatement = (req: Request, res: Response, next: NextFunction) =>
{
  const id :number = extractAccountID(req,res);
  // id is NaN
  if (!id){
    return;
  }

  // Permissively matches filter and sorting based on query data
  const { sort, filter } = extractFilterSortQuery(req);
  filter.account_id = id;
  sort._id = 1;


  Statements.aggregate()
    .match(filter)
    .sort(sort)
    .then (
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

        return res.status(200).json({
          meta: {
            statusCode: 200,
            message: "Statements found",
            validQuery: { // valid queries for discovery
              "paymentType": ["credit", "debit"],
              "sortByDate": ["true"]
            }
          },
          content: {
            // maybe return only the ids
            statements: statements
          }
        })
      }
    )
}

/**
 * Receives a list of Statements in the Request's body and tries to insert into the database
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Express NextFunction
 */
export const createStatements = (req: Request, res: Response, next: NextFunction) =>
{
  let statements = validateStatements(req,res);
  if (!statements){
    return;
  }

  Statements.insertMany(statements)
    .then(
      (statements: StatementMongoModel[]) => {
        return res.status(201).json({
          meta: {
            statusCode: 200,
            message: "Statements created"
          },
          content: {
            statements: statements
          }
        })
      },
      // insertMany fails
      (reason) => {
      return res.status(400).json({
        meta: {
          statusCode: 400,
          message: "Statements couldn't be created",
          code: reason.code
        }
      })
    })
}

export const getLastStatement = (req: Request, res: Response, next: NextFunction) =>
{
  const accountID = extractAccountID(req, res);
  if (!accountID){
    return;
  }

  // fetch the most recent statement only
  Statements.aggregate()
    .match({account_id: accountID})
    .sort({dataTransacao: -1})
    .limit(1)
    .then(
      (statement:StatementMongoModel[]) => {
        if (!statement){
          return res.status(404).json({
            meta: {
              statusCode: 404,
              message: "No statements could be found"
            }
          })
        }

        return res.status(200).json({
          meta: {
            statusCode: 200,
            message: "Last statement found"
          },
          content: {
            statement: statement
          }
        })
      },
      (reason) => {
        return res.status(400).json({
          meta: {
            statusCode: 400,
            message: "DB query rejected",
            code: reason.code
          }
        })
      }
    )
}