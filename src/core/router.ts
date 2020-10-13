import { Router } from "express";

import { LoginRoutes } from "@routes/auth/login.route";

const router = Router();

router.use('/api/login', LoginRoutes);

export { router }