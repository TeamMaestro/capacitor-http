import { strMapToJson } from './utils';

export class HttpHeaders {
  private _headers: Map<string, any[]>;

  constructor(headers?: HttpHeaders | { [name: string]: any }) {
    this._headers = new Map();
    if (headers instanceof HttpHeaders) {
      this._headers = headers._headers;
    } else if (headers !== null) {
      const keys = Object.keys(headers);
      for (let key of keys) {
        const value = keys[key];
        this._headers.set(key, value);
      }
    } else {
      this._headers = new Map();
    }
  }

  public has(name: string): boolean {
    if (!this._headers) return false;
    return this._headers.has(name);
  }

  public get(name: string): string | null {
    if (!this._headers) return null;
    const header = this.has(name) ? this._headers.get(name)[0] : null;
    return header;
  }

  public keys(): string[] {
    if (!this._headers) return [];
    return Array.from(this._headers.keys());
  }

  public getAll(name: string): string[] | null {
    if (!this._headers) return null;
    const header = this.has(name) ? this._headers.get(name) : null;
    return header;
  }

  public append(name: string, value: string): HttpHeaders {
    const old = this._headers.has(name) ? this._headers.get(name) : [];
    old.push(value);
    this._headers.set(name, old);
    return this;
  }

  public delete(name: string): HttpHeaders {
    this._headers.delete(name);
    return this;
  }

  public set(name: string, value: string | string[]): HttpHeaders {
    if (Array.isArray(value)) {
      this._headers.set(name, value);
    } else {
      this._headers.set(name, [value]);
    }
    return this;
  }

  public toJSON() {
    return strMapToJson(this._headers);
  }
}
