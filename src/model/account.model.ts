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