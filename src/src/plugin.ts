import { IHttp, HttpRequest } from './definitions';
import { Plugins } from '@capacitor/core';
const { HttpPlugin } = Plugins;

export class Http implements IHttp {
  request(options: HttpRequest): Promise<{ value: string }> {
    throw new Error('Method not implemented.');
  }

  get(options: { url: string }): Promise<{ value: string }> {
    throw new Error('Method not implemented.');
  }
  post(options: { url: string }): Promise<{ value: string }> {
    throw new Error('Method not implemented.');
  }
  delete(options: { url: string }): Promise<{ value: string }> {
    throw new Error('Method not implemented.');
  }
  put(options: { url: string }): Promise<{ value: string }> {
    throw new Error('Method not implemented.');
  }
  options(options: { url: string }): Promise<{ value: string }> {
    throw new Error('Method not implemented.');
  }
}
