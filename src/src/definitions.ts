declare global {
  interface PluginRegistry {
    Http?: IHttp;
  }
}

import { HttpParams } from './http-params';

export interface IHttp {
  request(options: HttpRequest): Promise<{ value: string }>;
  request(options: { url: string }): Promise<{ value: string }>;
  get(options: { url: string }): Promise<{ value: string }>;
  post(options: { url: string }): Promise<{ value: string }>;
  delete(options: { url: string }): Promise<{ value: string }>;
  put(options: { url: string }): Promise<{ value: string }>;
  options(options: { url: string }): Promise<{ value: string }>;
}

export interface HttpRequestOptions {
  params?: HttpParams;
}

export class HttpRequest {
  private _body: Object | null;
  private _url: string;
  private _method: HttpRequestMethod;
  private _options: Object | null;

  constructor(
    method: HttpRequestMethod,
    url: string,
    body: Object | null,
    options: Object | null
  ) {
    this._body = body;
    this._method = method;
    this._url = url;
    this._body = body;
    this._options = options;
  }

  get body(): Object | null {
    return this._body;
  }

  get url(): string {
    return this._url;
  }

  get method(): string {
    return this._method;
  }
}

export enum HttpRequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}
