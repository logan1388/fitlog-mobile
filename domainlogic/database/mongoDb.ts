// Copyright FitBook

import IDatabase from '../../commonlib/database/IDatabase';
import axios from 'axios';
import ServiceResponse from '../../commonlib/models/ServiceResponse';

export default class MongoDb implements IDatabase {
  private endpoint: string;
  // TODO: Read from config file once all endpoints are migrated
  private static readonly prefix = 'http://localhost:9000';

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async GetAsync(id: string): Promise<Record<string, any>> {
    try {
      const url = `${MongoDb.prefix}${this.endpoint}/${id}`;
      const r = await axios.get(url);

      if (r.status !== 200) {
        const s = new ServiceResponse();
        s.responseCode = r.status;
        s.responseMessage = r.statusText;

        return s;
      }

      return r.data;
    } catch (error) {
      console.error(error);
      const r = new ServiceResponse();
      r.responseCode = 500;
      r.responseMessage = 'Unable to fetch data from DB';

      return r;
    }
  }

  public async GetListAsync(): Promise<any[] | ServiceResponse> {
    try {
      const url = `${MongoDb.prefix}${this.endpoint}`;
      const r = await axios.get(url);

      if (r.status !== 200) {
        const s = new ServiceResponse();
        s.responseCode = r.status;
        s.responseMessage = r.statusText;

        return s;
      }

      return r.data;
    } catch (error) {
      console.error(error);
      const r = new ServiceResponse();
      r.responseCode = 500;
      r.responseMessage = 'Unable to fetch data from DB';

      return r;
    }
  }

  public async GetListByUserId(userId: string, params?: Record<string, any>): Promise<any[] | ServiceResponse> {
    let url = `${MongoDb.prefix}${this.endpoint}`;

    if (params) {
      const filters = Object.keys(params);
      filters.forEach(key => {
        url = `${url}/${params[key]}`;
      });

      url = `${url}?userId=${userId}`;
    }

    try {
      const r = await axios.get(url);

      if (r.status !== 200) {
        const s = new ServiceResponse();
        s.responseCode = r.status;
        s.responseMessage = r.statusText;

        return s;
      }

      return r.data;
    } catch (error) {
      console.error(error);
      const r = new ServiceResponse();
      r.responseCode = 500;
      r.responseMessage = 'Unable to fetch data from DB';

      return r;
    }
  }

  public async PostAsync(data: Record<string, any>): Promise<any> {
    try {
      const url = `${MongoDb.prefix}${this.endpoint}`;
      const r = await axios.post(url, data);

      if (r.status !== 200) {
        const s = new ServiceResponse();
        s.responseCode = r.status;
        s.responseMessage = r.statusText;

        return s;
      }

      return r.data;
    } catch (error) {
      console.error(error);
      const r = new ServiceResponse();
      r.responseCode = 500;
      r.responseMessage = 'Unable to post data from DB';

      return r;
    }
  }
}
