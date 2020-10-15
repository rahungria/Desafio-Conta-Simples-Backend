import { Router } from "express";

import { createStatements, getCardGroupedStatements, getFullStatement, getLastStatement } from "@controllers/statements.controller";
import { authorizeAccountAccess } from "@src/middleware/account.authorization.middleware";
import { jwt_authentication } from "@src/middleware/authentication.middleware";

const router = Router();

router.post('/', createStatements); // creates several statements in format [{...},...]
router.get('/', getFullStatement) // get the full statement from the account that is logged in currently
router.get('/last', getLastStatement) // fetch only the last statement of logged in account
router.get('/cardGrouped', getCardGroupedStatements) // fetch only the last statement of logged in account
// router.get('/:accountID', getFullStatement) // get the statement from the account with given id
// router.get('/:accountID/last', getLastStatement) // fetch only the last statement if authorized

export { router as StatementsRoutes }