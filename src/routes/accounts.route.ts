import { createAccount, getExtrato, getSaldo } from "@src/controllers/account.controller";
import { jwt_validation } from "@src/middleware/authentication.middleware";
import { Router } from "express";


const router = Router();

router.post('/', jwt_validation, createAccount); //endpoint to add more accounts to system
router.get('/saldo/:id', getSaldo); // get the saldo from one account given the id
router.get('/extrato/:accountid', getExtrato) // get the extrato from the account with given id

export { router as AccountsRoute}