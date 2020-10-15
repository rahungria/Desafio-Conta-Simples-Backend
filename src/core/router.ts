import { Router } from "express";

import { AccountsRoutes } from "@src/routes/accounts.route";
import { StatementsRoutes } from "@src/routes/statements.route";
import { AuthRoutes } from "@src/routes/auth/authentication.route";
import { jwt_authentication } from "@src/middleware/authentication.middleware";
import { authorizeAccountAccess } from "@src/middleware/account.authorization.middleware";

const router = Router();

router.use('/api/auth', AuthRoutes);
router.use('/api/account', AccountsRoutes);
router.use('/api/statements', jwt_authentication, authorizeAccountAccess, StatementsRoutes); // every routes requires full authorization

export { router }