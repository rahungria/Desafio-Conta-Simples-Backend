import { type } from "os";

export interface IAccount {
  id: number;
  nome: string;
  cnpj: string;
  dadosBancario: {
    banco: number;
    bancoNome: string;
    agencia: number;
    conta: number;
    digitoConta: string;
  }
  saldo: number;
}

// function for debuging purposes only
export const  isAccount = (o:any) : o is IAccount => {
  try {
    const u: IAccount = o;
    return (
      typeof u.id === "number" &&
      typeof u.nome === "string" &&
      typeof u.cnpj === "string" &&
      typeof u.dadosBancario.banco === "number" &&
      typeof u.dadosBancario.bancoNome === "string" &&
      typeof u.dadosBancario.agencia === "number" &&
      typeof u.dadosBancario.conta === "number" &&
      typeof u.dadosBancario.digitoConta === "string" && 
      typeof u.saldo === "number"
    );
  } catch {
    return false;
  }
}