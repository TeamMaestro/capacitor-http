export class HttpParams {
  private _httpParams: URLSearchParams;
  constructor(params: {} = {}) {
    this._httpParams = new URLSearchParams();
    const keys = Object.keys(params);
    for (let key of keys) {
      const value = params[key];
      this._httpParams.set(key, value);
    }
  }


  public has(param: string): boolean{
      return this._httpParams.has(param);
  }
  public get(param: string): string | null{
      return this._httpParams.get(param);
  }
  public getAll(param: string): string[] | null{
      return this._httpParams.getAll(param);
  }
  public keys(): string[]{
      return Array.from(this._httpParams.keys());
  }
  public append(param: string, value: string): HttpParams {
      this._httpParams.append(param,value);
      return this;
  }
  public set(param: string, value: string): HttpParams{
      this._httpParams.set(param,value);
      return this;
  }
  public delete(param: string): HttpParams{
      this._httpParams.delete(param);
      return this;
  }
  public toString(): string{
      return this._httpParams.toString();
  }
}
