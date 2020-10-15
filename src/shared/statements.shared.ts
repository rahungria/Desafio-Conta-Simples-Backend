import { Request, Response } from "express";

/**
 * Extract param 'accountID' from Request. 
 * IF DATA IS INVALID SETS THE HTTP RESPONSE, SO BREAK FROM CALLING FUNCTION
 * @param req HTTP Request to get data from
 * @param res HTTP Response to exit prematurely if data is invalid
 */
export const extractAccountID = (req: Request, res: Response) : number|null =>
{
  const id :number = +req.params.accountID;
  // id is NaN
  if (!id){
    res.status(400).json({
      meta: {
        statusCode: 400,
        message: "Invalid ID / User has no authorization"
      },
    })
    return null;
  }
  
  return id;
}

/**
 * Extracts all possible query params for fetching statements:
 * {'sort': 'sortByDate', 'filter': 'paymentType', 'accountID': ':accountID'}
 * @param req HTTP Request to extract queries
 * @returns obj: {sort,filter,account}
 */
export const extractFullStatementQuery = (req: Request) => 
{
  const sort: {[key:string]: number} = {};
  const filter: {[key:string]:any} = {};
  let accountID: number = NaN;
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
  // fetches accountID to TRY to match
  if (req.query.accountID){
    accountID = +req.query.accountID
  }

  return { sort, filter, accountID }
}