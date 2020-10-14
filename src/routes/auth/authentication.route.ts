import { Router } from "express";

import { login, signup } from "@src/controllers/auth/authentication.controller";
import { jwt_authentication } from "src/middleware/authentication.middleware"

const router = Router();

router.post('/login', jwt_authentication,login);
router.post('/signup', jwt_authentication, signup); // signup of new users requires authentication

export { router as AuthRoutes }