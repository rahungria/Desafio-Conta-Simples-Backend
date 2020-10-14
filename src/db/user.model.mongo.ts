import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from '@models/user.model';
import { AccountMongoModel } from './account.model.mongo';

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
    },
    role : {
      rolename: { type:String, required:false },
      account: { type:Number, required:false }
    }
  }
)

const Users = mongoose.model<UserMongoModel>("Users", UserSchema);

export {
  UserMongoModel, 
  Users 
}

