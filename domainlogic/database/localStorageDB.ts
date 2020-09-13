// Copyright FitBook

import IDatabase from '../../commonlib/database/IDatabase';
import AsyncStorage from '@react-native-community/async-storage';
import UUIDGenerator from 'react-native-uuid-generator';
import { TableModel } from '../models/database/table';
import ServiceResponse from '../../commonlib/models/ServiceResponse';

export default class LocalStorageDB implements IDatabase {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public async GetAsync(id: string): Promise<Record<string, any>> {
    const localStorageTable = await AsyncStorage.getItem(this.tableName);

    if (!localStorageTable) {
      return new ServiceResponse();
    }

    const parsedTable = JSON.parse(localStorageTable).data;
    const data = parsedTable[id];

    if (!data) {
      return new ServiceResponse();
    }

    return data;
  }

  public async GetListAsync(): Promise<any[] | ServiceResponse> {
    const localStorageTable = await AsyncStorage.getItem(this.tableName);

    if (!localStorageTable) {
      return new ServiceResponse();
    }

    const parsedTable = JSON.parse(localStorageTable).data;
    const data = parsedTable;

    if (!data) {
      return new ServiceResponse();
    }

    let parsedData: any[] = [];

    Object.keys(data).forEach(key => {
      parsedData.push(Object.assign({}, data[key], { id: key }));
    });

    return parsedData;
  }

  public async GetListByUserId(_userId: string, params?: Record<string, any>): Promise<any[] | ServiceResponse> {
    const localStorageTable = await AsyncStorage.getItem(this.tableName);

    if (!localStorageTable) {
      return new ServiceResponse();
    }

    const parsedTable = JSON.parse(localStorageTable).data;
    const data = parsedTable;

    if (!data) {
      return new ServiceResponse();
    }

    let parsedData: any[] = [];

    Object.keys(data).forEach(key => {
      parsedData.push(Object.assign({}, data[key], { _id: key }));
    });

    if (params) {
      const filters = Object.keys(params);

      const filteredData = parsedData.filter(p => {
        return filters.every(key => params[key] === p[key]);
      });

      return filteredData;
    }

    return parsedData;
  }

  public async PostAsync(data: Record<string, any>): Promise<any> {
    let id = data.id;

    if (id === null || id === undefined) {
      id = await UUIDGenerator.getRandomUUID();
      data.id = id;
    }

    let parsedTable: any = {};
    const localStorageTable = await AsyncStorage.getItem(this.tableName);

    if (localStorageTable) {
      parsedTable = JSON.parse(localStorageTable).data;
    }

    parsedTable[id] = data;

    const updatedTable: TableModel = {
      data: parsedTable,
    };

    await AsyncStorage.setItem(this.tableName, JSON.stringify(updatedTable));
    return data;
  }
}
