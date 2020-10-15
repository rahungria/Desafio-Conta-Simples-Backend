import { Router } from "express";

import { createStatements, getCardGroupedStatements, getFullStatement, getLastStatement } from "@controllers/statements.controller";

const router = Router();

router.post('/', createStatements); // creates several statements in format [{...},...]
router.get('/', getFullStatement) // get the full statement from the account that is logged in currently
router.get('/last', getLastStatement) // fetch only the last statement of logged in account
router.get('/cardGrouped', getCardGroupedStatements) // fetch only the last statement of logged in account

export { router as StatementsRoutes }