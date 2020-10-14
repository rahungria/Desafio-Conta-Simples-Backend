export interface IEmpresa {
  id: number;
  nome: string;
  cnpj: string;
  dadosBancarios: {
    banco: number;
    bancoNome: string;
    agencia: number;
    conta: number;
    digitoConta: string;
  }
  saldo: number;
}