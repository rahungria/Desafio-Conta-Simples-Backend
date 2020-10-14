import { createAccount, getSaldo } from "@src/controllers/account.controller";
import { jwt_validation } from "@src/middleware/authentication.middleware";
import { Router } from "express";


const router = Router();

router.post('/', jwt_validation, createAccount); //endpoint to add more accounts to system
router.get('/saldo/:accountID', getSaldo);

export { router as AccountsRoute}