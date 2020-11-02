// Copyright FitBook
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import IDatabase, { IQueryParams, Operators } from '../../commonlib/database/IDatabase';
import ServiceResponse from '../../commonlib/models/ServiceResponse';

export default class FirebaseDB implements IDatabase {
  private tableName: string;
  private currentUserId: string | undefined;
  private isOffline: boolean;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.currentUserId = auth().currentUser?.uid;
    this.isOffline = false;
  }
  public async PostAsync(data: Record<string, any>) {
    if (!this.isOffline) this.setOffline();

    try {
      data.userId = this.currentUserId;
      const result = await firestore().collection(this.tableName).add(data);
      const value = await result.get();
      return value;
    } catch (error) {
      return new ServiceResponse();
    }
  }

  public async GetAsync(id: string): Promise<Record<string, any>> {
    if (!this.isOffline) this.setOffline();

    try {
      const querySnapshot = await firestore().collection(this.tableName).where('id', '==', id).get();
      return querySnapshot.docs;
    } catch (error) {
      console.error('Something went wrong', error);
      return new ServiceResponse();
    }
  }

  public async GetListAsync(params?: IQueryParams[]): Promise<any[] | ServiceResponse> {
    if (!this.isOffline) this.setOffline();

    try {
      let query = firestore().collection(this.tableName).where('userId', '==', this.currentUserId);

      if (params) {
        params.forEach(param => {
          query.where(param.key, this.GetOperator(param.operator), param.value);
        });
      }
      const snapshot = await query.get();

      let data: any[] = [];
      snapshot.forEach(doc => {
        data.push(doc.data());
      });

      return data;
    } catch (error) {
      console.error('Something went wrong', error);
      return new ServiceResponse();
    }
  }

  public async GetListByUserId(_userId: string, _params?: Record<string, any>): Promise<any[] | ServiceResponse> {
    try {
      const snapshot = await firestore().collection(this.tableName).get();
      return snapshot.docs;
    } catch (error) {
      console.error('Something went wrong', error);
      return new ServiceResponse();
    }
  }

  private GetOperator(operator: Operators): any {
    switch (operator) {
      case Operators.EQUALS:
        return '==';
      case Operators.GREATERTHANOREQUALTO:
        return '>=';
      case Operators.LESSTHANOREQUALTO:
        return '<=';
      case Operators.NOTEQUALTO:
        return '!=';
      default:
        return '==';
    }
  }

  private async setOffline() {
    try {
      await firestore().enableNetwork();
      this.isOffline = true;
    } catch (error) {
      console.error('Unable to set device offline.', error);
    }
  }
}
