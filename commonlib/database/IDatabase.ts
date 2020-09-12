// Copyright FitBook

import ServiceResponse from '../models/ServiceResponse';

export default interface IDatabase {
  GetAsync: (id: string) => Promise<any>;
  GetListAsync: () => Promise<any[] | ServiceResponse>;
  PostAsync: (data: Record<string, any>) => Promise<any>;
}
