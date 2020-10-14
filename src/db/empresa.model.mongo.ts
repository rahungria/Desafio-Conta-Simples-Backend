import mongoose, { Document, mongo, Schema } from "mongoose";

import { IEmpresa } from "@models/empresas.model";

type EmpresaMongoModel = IEmpresa & Document;

const EmpresaSchema: Schema<EmpresaMongoModel> = new Schema<EmpresaMongoModel>(
  {
    id: Number,
    nome: String,
    cnpj: String,
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
const Empresas = mongoose.model<EmpresaMongoModel>("Empresas", EmpresaSchema);

export {
  EmpresaMongoModel,
  Empresas
}