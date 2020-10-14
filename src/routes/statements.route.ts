import { Router } from "express";

import { jwt_authentication } from "@src/middleware/authentication.middleware";
import { createStatements, getFullStatement } from "@controllers/statements.controller";

const router = Router();

router.post('/', jwt_authentication, createStatements); // creates several statements in format [{...},...]
router.get('/:accountid', getFullStatement) // get the extrato from the account with given id

export { router as StatementsRoutes }