// Copyright FitBook

import ServiceResponse from '../models/ServiceResponse';

export default interface IDatabase {
  GetAsync: (id: string) => Promise<any>;
  GetListByUserId: (
    userId: string,
    params?: Record<string, any>,
    query?: Record<string, any>
  ) => Promise<any[] | ServiceResponse>;
  GetListAsync: (params?: IQueryParams[]) => Promise<any[] | ServiceResponse>;
  PostAsync: (data: Record<string, any>) => Promise<any>;
}

export enum Operators {
  EQUALS,
  GREATERTHANOREQUALTO,
  LESSTHANOREQUALTO,
  NOTEQUALTO,
}

export interface IQueryParams {
  key: string;
  operator: Operators;
  value: string | number;
}
