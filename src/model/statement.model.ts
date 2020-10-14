export interface IStatement {
  account_id: number;
  dataTransacao: Date;
  valor: number;
  finalCartao: string | null;
  tipoTransacao: string;
  descricaoTransacao: string;
  estabelecimento: string | null;
  credito: boolean;
}

// maybe add validators to mongo schema
export const isStatement = (o:any): o is IStatement => {
  try{
    const u:IStatement = o as IStatement;
    return (
      typeof u.account_id === "number" &&
      typeof u.dataTransacao === "string" &&
      typeof u.valor === "number" &&
      // (typeof u.finalCartao === "string" || typeof u.finalCartao === "undefined") &&
      typeof u.tipoTransacao === "string" &&
      typeof u.descricaoTransacao === "string" &&
      // (typeof u.estabelecimento === "string" || typeof u.estabelecimento === "undefined") &&
      typeof u.credito === "boolean"
    );
  } catch {
    return false;
  }
} 