import { Router } from "express";

import { AuthRoutes } from "@src/routes/auth/authentication.route";
import { AccountsRoute } from "@src/routes/accounts.route";

const router = Router();

router.use('/api/auth', AuthRoutes);
router.use('/api/account', AccountsRoute);

export { router }