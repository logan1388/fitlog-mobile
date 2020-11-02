// Copyright FitBook

import { CreateResistanceModel, ResistanceModel, ResistanceTypes } from '../../commonlib/models/ResistanceModel';
import ResistanceService from '../../commonlib/services/resistance';
import ServiceResponse from '../../commonlib/models/ServiceResponse';
import FirebaseDB from '../database/FirebaseDB';

export default class ResistanceController {
  private resistanceSvc: ResistanceService;
  private static readonly TABLE_NAME: string = 'Resistances';

  constructor() {
    this.resistanceSvc = new ResistanceService(new FirebaseDB(ResistanceController.TABLE_NAME));
  }

  public async createResistance(data: CreateResistanceModel): Promise<ResistanceModel | ServiceResponse> {
    const response = await this.resistanceSvc.createResistance(data);

    return response;
  }

  public async getResistanceList(type: ResistanceTypes, userId: string): Promise<ResistanceModel[] | ServiceResponse> {
    const response: ResistanceModel[] | ServiceResponse = await this.resistanceSvc.getResistanceListByUserId(
      type,
      userId
    );

    return response;
  }
}

export const resistanceController = new ResistanceController();
