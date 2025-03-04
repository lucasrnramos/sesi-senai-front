export interface LoginData {
  cpf: string
  senha: string
}

export interface DataError {
  code: number;
  message: string;
  statusText: string;
  reportEnabled: boolean;
}

export interface MenuItem {
  name: string
  active: boolean
  route?: string
  children?: Array<MenuItem>
}

export interface CaraterAtendimento {
  tipo: string;
  codigo: string;
}

export interface ColumnMatTable<T> {
  columnDef: string;
  header: string;
  sticky: boolean;
  stickyEnd: boolean;
  cell: (element: T) => string;
}

export interface Colaborador {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  id_perfil: number;
  celular: string;
  cep: string;
  uf: string;
  localidade: string;
  bairro: string;
  logradouro: string;
  status: string;
  senha: string;
  created_at: string;
  updated_at: string;
}
