import mongoose, { Document, Schema } from 'mongoose';

import { IStatement } from '@models/statement.model';

type StatementMongoModel = IStatement & Document;

const StatementSchema: Schema<StatementMongoModel> = new Schema<StatementMongoModel>(
  {
    account_id :          {type:Number, required:true},
    dataTransacao :       {type:Date, required:true},
    valor :               {type:Number, required:true},
    finalCartao :         {type:String, required:false, default: null},
    tipoTransacao :       {type:String, required:true},
    descricaoTransacao :  {type:String, required:true},
    estabelecimento :     {type:String, required:false, default: null},
    credito:              {type:Boolean, required:true}  
  }
)

const Statements = mongoose.model<StatementMongoModel>("Statements", StatementSchema);

export {
  StatementMongoModel, 
  Statements 
}