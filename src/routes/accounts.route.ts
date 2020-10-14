import { createAccount, createStatements, getFullStatement, getSaldo } from "@src/controllers/account.controller";
import { jwt_authentication } from "@src/middleware/authentication.middleware";
import { Router } from "express";


const router = Router();

router.post('/', jwt_authentication, createAccount); //endpoint to add more accounts to system
router.post('/statement', jwt_authentication, createStatements); // creates several statements in format [{...},...]
router.get('/saldo/:id', getSaldo); // get the saldo from one account given the id
router.get('/statement/:accountid', getFullStatement) // get the extrato from the account with given id

export { router as AccountsRoute}