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