import { Router } from "express";

import { createStatements, getFullStatement, getLastStatement } from "@controllers/statements.controller";
import { authorizeAccountAccess } from "@src/middleware/account.authorization.middleware";
import { jwt_authentication } from "@src/middleware/authentication.middleware";

const router = Router();

router.post('/', jwt_authentication, createStatements); // creates several statements in format [{...},...]
router.get('/:accountID', jwt_authentication, authorizeAccountAccess, getFullStatement) // get the statement from the account with given id
router.get('/:accountID/last', jwt_authentication, authorizeAccountAccess, getLastStatement) // fetch only the last statement if authorized

export { router as StatementsRoutes }