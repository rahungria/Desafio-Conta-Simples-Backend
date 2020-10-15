import mongoose, { Document, mongo, Schema } from "mongoose";

import { IAccount } from "src/model/account.model";

type AccountMongoModel = IAccount & Document;

const AccountSchema: Schema<AccountMongoModel> = new Schema<AccountMongoModel>(
  {
    id: {type:Number, unique:true, required:true},
    nome: {type:String, required:true},
    cnpj: {type:String, required:true, unique:true},
    dadosBancario: {
      banco: {type:Number, required:true},
      bancoNome: {type:String, required:true},
      agencia: {type:Number, required:true},
      conta: {type:Number, required:true},
      digitoConta: {type:String, required:true}
    },
    saldo: {type:Number, required:true}
  }
)

// default connection
const Accounts = mongoose.model<AccountMongoModel>("Accounts", AccountSchema);

export {
  AccountMongoModel,
  Accounts
}