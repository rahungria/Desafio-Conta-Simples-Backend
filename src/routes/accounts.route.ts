import { Router } from "express";

import { createAccount, getBalance } from "@src/controllers/account.controller";

const router = Router();

router.post('/', createAccount); //endpoint to add more accounts to system
router.get('/saldo/', getBalance); // get the saldo from one account given the id

export { router as AccountsRoutes }