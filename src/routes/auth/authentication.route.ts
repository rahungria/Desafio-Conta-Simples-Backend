import { Router } from "express";

import { login, signup } from "controllers/auth/authentication.controller";

const router = Router();

router.post('/login', login);
router.post('/signup', signup); // signup of new users requires authentication

export { router as AuthRoutes }