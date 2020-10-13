import {  } from 'express';
import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from '@models/user.model';

type UserMongoModel = IUser & Document;

const UserSchema: Schema<UserMongoModel> = new Schema<UserMongoModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  }
)

const Users = mongoose.model<UserMongoModel>("Users", UserSchema);

export {
  UserMongoModel, 
  Users 
}

