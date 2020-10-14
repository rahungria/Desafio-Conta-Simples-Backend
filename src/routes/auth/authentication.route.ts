import { Router } from "express";

import { login, signup } from "@src/controllers/auth/authentication.controller";
import { jwt_validation } from "src/middleware/authentication.middleware"

const router = Router();

router.post('/login', login);
router.post('/signup', jwt_validation, signup); // signup of new users requires authentication

export { router as AuthRoutes }