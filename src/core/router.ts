import { Router } from "express";

import { AuthRoutes } from "@src/routes/auth/authentication.route";

const router = Router();

router.use('/api/auth', AuthRoutes);

export { router }