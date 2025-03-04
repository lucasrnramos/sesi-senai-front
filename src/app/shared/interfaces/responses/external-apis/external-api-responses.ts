interface ItemResponseUF {
  id: number;
  sigla: string
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  }
}

export type ResponseUF = ItemResponseUF[];

export interface ItemResponseBank {
  CodigoSicap: string;
  Nome: string;
  Praca: string;
  Pais: string;
}
export interface ResponseBank {
  "@odata.context": string,
  "value": ItemResponseBank[]
}
