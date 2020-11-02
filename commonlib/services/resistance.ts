// Copyright FitBook

import IDatabase, { IQueryParams, Operators } from '../database/IDatabase';
import { CreateResistanceModel, ResistanceModel } from '../models/ResistanceModel';
import ServiceResponse, { isServiceResponse } from '../models/ServiceResponse';

export default class ResistanceService {
  private db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  public async createResistance(data: CreateResistanceModel): Promise<ResistanceModel | ServiceResponse> {
    const r: ResistanceModel | ServiceResponse = await this.db.PostAsync(data);

    return r;
  }

  public async getResistance(id: string): Promise<ResistanceModel | ServiceResponse> {
    const r: ResistanceModel | ServiceResponse = await this.db.GetAsync(id);

    return r;
  }

  public async getResistanceListByUserId(type: string): Promise<ResistanceModel[] | ServiceResponse> {
    const param: IQueryParams = {
      key: 'type',
      value: type.toLocaleUpperCase(),
      operator: Operators.EQUALS,
    };

    const r: ResistanceModel[] | ServiceResponse = await this.db.GetListAsync([param]);

    if (isServiceResponse(r)) {
      return r;
    }

    if (r.length < 1) {
      const serviceResponse = new ServiceResponse();
      serviceResponse.responseCode = 404;
      serviceResponse.responseMessage = 'Resistance data not found';

      return serviceResponse;
    }

    return r;
  }
}
