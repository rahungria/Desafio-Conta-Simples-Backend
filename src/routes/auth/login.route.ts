import { Router } from "express";

import { login } from "@controllers/auth/login.controller";

const router = Router();

router.post('/', login);

export { router as LoginRoutes }