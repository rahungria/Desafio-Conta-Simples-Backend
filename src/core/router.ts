import { Router } from "express";

import { AuthRoutes } from "@src/routes/auth/authentication.route";
import { AccountsRoutes } from "@src/routes/accounts.route";
import { StatementsRoutes } from "@src/routes/statements.route";

const router = Router();

router.use('/api/auth', AuthRoutes);
router.use('/api/account', AccountsRoutes);
router.use('/api/statements', StatementsRoutes)

export { router }