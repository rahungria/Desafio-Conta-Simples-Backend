import { Router } from "express";

import { login, signup } from "@src/controllers/auth/authentication.controller";

const router = Router();

router.post('/login', login);
router.post('/signup', signup);

export { router as AuthRoutes }