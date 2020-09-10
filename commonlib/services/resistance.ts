// Copyright FitBook

import IDatabase from '../database/IDatabase';
import { CreateResistanceModel, ResistanceModel } from '../models/ResistanceModel';
import ServiceResponse from '../models/ServiceResponse';

export default class ResistanceService {
  private db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  public async addResistance(data: CreateResistanceModel): Promise<ResistanceModel | ServiceResponse> {
    const r: ResistanceModel | ServiceResponse = await this.db.PostAsync(data);

    return r;
  }

  public async getResistance(id: string): Promise<ResistanceModel | ServiceResponse> {
    const r: ResistanceModel | ServiceResponse = await this.db.GetAsync(id);

    return r;
  }
}
