import { Colaborador } from "../system/system-interfaces";

interface BaseResponse {
  status: number;
  success: boolean;
  msg: string;
}

export type ErrorResponse = BaseResponse;

export interface ValidationErrorResponse extends ErrorResponse {
  object: Record<string, string[]>;
}

export interface ProfileSuccessResponse extends BaseResponse {
  object: {
    perfil: string;
    status: string;
    data: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface SimpleSuccessResponse extends BaseResponse {
  data: string;
}

export type SuccessResponse = BaseResponse;

export interface ResponseConvites {
  object: Colaborador[];
}

export interface ResponseEmailConvite extends BaseResponse {
  email: string;
}

export interface ResponseLogin extends BaseResponse {
  object : {
    id_perfil: number;
    nome: string;
  }
}

export interface ResponsePerfis extends BaseResponse {
  object: {
    id: number;
    perfil: string;
  }[]
}
