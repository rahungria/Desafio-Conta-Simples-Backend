import { Router } from "express";

import { AccountsRoutes } from "routes/accounts.route";
import { StatementsRoutes } from "routes/statements.route";
import { AuthRoutes } from "routes/auth/authentication.route";
import { jwt_authentication } from "middleware/authentication.middleware";
import { authorizeAccountAccess } from "middleware/account.authorization.middleware";

const router = Router();

router.use('/api/auth', AuthRoutes); // no authorization
router.use('/api/account', jwt_authentication, authorizeAccountAccess, AccountsRoutes); // requires full authorization
router.use('/api/statements', jwt_authentication, authorizeAccountAccess, StatementsRoutes); // requires full authorization

export { router }