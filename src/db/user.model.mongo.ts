import mongoose, { Document, Schema } from 'mongoose';

import { IUser } from 'model/user.model';

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
    role: {
      rolename: { type:String, required:[true, "rolename required"], enum:["admin", "user"] },
      account: { type:Number, required:[true, "account id required"] }
    }
  }
)

const Users = mongoose.model<UserMongoModel>("Users", UserSchema);

export {
  UserMongoModel, 
  Users 
}

