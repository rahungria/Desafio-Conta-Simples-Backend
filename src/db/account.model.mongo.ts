import mongoose, { Document, mongo, Schema } from "mongoose";

import { IAccount } from "@src/model/account.model";

type AccountMongoModel = IAccount & Document;

const AccountSchema: Schema<AccountMongoModel> = new Schema<AccountMongoModel>(
  {
    id: {type:Number, unique:true},
    nome: String,
    cnpj: {type:String, unique:true},
    dadosBancarios: {
      banco: Number,
      bancoNome: String,
      agencia: Number,
      conta: Number,
      digitoConta: String
    },
    saldo: Number
  }
)

// default connection
const Accounts = mongoose.model<AccountMongoModel>("Accounts", AccountSchema);

export {
  AccountMongoModel,
  Accounts
}