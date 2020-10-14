import { createAccount, getSaldo } from "@src/controllers/account.controller";
import { jwt_authentication } from "@src/middleware/authentication.middleware";
import { Router } from "express";


const router = Router();

router.post('/', jwt_authentication, createAccount); //endpoint to add more accounts to system
router.get('/:id/saldo/', jwt_authentication, getSaldo); // get the saldo from one account given the id

export { router as AccountsRoutes }