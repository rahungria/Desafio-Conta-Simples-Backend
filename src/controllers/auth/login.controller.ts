import { Request, Response, NextFunction } from "express";
import bcrypt, {  } from "bcrypt"

import { IUser } from "@models/user.model";

export const login = (req: Request, res: Response, next: NextFunction) =>
{
  // do work
}

export const signup = (req: Request, res: Response, next: NextFunction) => 
{
  let user: IUser = {username: req.body.username, password: req.body.password};
  console.log(user);
  // bcrypt.hash()
  res.status(200).json(user)
}