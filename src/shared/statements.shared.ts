import { isStatement, IStatement } from "@src/model/statement.model";
import { Request, Response } from "express";

/**
 * Extract param 'accountID' from Request. 
 * IF DATA IS INVALID SETS THE HTTP RESPONSE, SO BREAK FROM CALLING FUNCTION
 * @param req HTTP Request to get data from
 * @param res HTTP Response to exit prematurely if data is invalid
 */
export const extractAccountID = (req: Request, res: Response) : number =>
{
  const id :number = +req.params.accountID;
  // id is NaN
  if (!id){
    res.status(400).json({
      meta: {
        statusCode: 400,
        message: "Invalid ID"
      },
    })
  }
  
  return id;
}

/**
 * Extracts all possible query params for fetching statements
 * @param req HTTP Request to extract queries
 */
export const extractFilterSortQuery = (req: Request) => 
{
  const sort: {[key:string]: number} = {};
  const filter: {[key:string]:any} = {};
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
      sort.dataTransacao = 1;
    }
  }

  return { sort, filter }
}

/**
 * Goes through body of Request to validate that it consists only of Statements
 * @param req HTTP Request to extract array of Statements from body
 * @param res HTTP Response to return prematurely if the Request body is invalid
 */
export const validateStatements = (req: Request, res: Response) : IStatement[] | null => 
{
  const statements: IStatement[] = req.body as IStatement[];
  // if statement data in body is malformed maybe remove of replace (sync...)
  for (let statement of statements){
    if (!isStatement(statement)){
      res.status(400).json({
        meta: {
          statusCode: 400,
          message: "Invalid Statement"
        }
      })
      return null;
    }
  }
  return statements;
}