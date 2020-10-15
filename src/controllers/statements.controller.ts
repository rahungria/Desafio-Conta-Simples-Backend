import { Request, Response, NextFunction } from "express";

import { StatementMongoModel, Statements } from "@src/db/statement.model.mongo";
import { isStatement, IStatement } from "@models/statement.model";
import { extractAccountID, extractFullStatementQuery, validateStatements } from "@src/shared/statements.shared";


// maybe use a cursor and an iterator?
export const getFullStatement = (req: Request, res: Response, next: NextFunction) =>
{
  // const id :number = extractAccountID(req,res);
  console.log(res.locals);
  
  const id: number = res.locals.accountID;
  // id is NaN
  if (!id){
    return res.status(400).json({
      meta: {
        statusCode: 400,
        message: "No account ID found" 
      }
    })
  }

  // Permissively matches filter and sorting based on query data
  const { sort, filter, accountID } = extractFullStatementQuery(req);
  filter.account_id = id;
  sort._id = 1;

  // maybe permit or change logic based on different passed values, or have an array of permited accounts on user, etc...
  // maybe move to authorization
  // ignores accountID query if it can't parse it
  if (accountID && accountID != id) {
    return res.status(401).json({
      meta: {
        statusCode: 401,
        message: "Tried to query account unnauthorized by user"
      }
    })
  }

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
              "accountID" : {
                values: [":accountID"],
                description: "forces a try to bypass authorization, mostly here for debugging / expansion (if the 'Account x Users' relation become a 'many x many')"
              },
              "paymentType": {
                values: ["credit", "debit"],
                description: "filter the statements to match the card used"
              },
              "sortByDate": {
                values: ["true"],
                description: "sort statements by date of transaction"
              }
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