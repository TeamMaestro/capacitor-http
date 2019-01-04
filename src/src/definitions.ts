declare global {
    interface PluginRegistry {
        Http?: IHttp;
    }
}

export type HttpDataSerializerType = 'text' | 'json' | 'urlencoded';

export interface IHttp {

    request(options: HttpRequest): Promise<HttpResponse>;

    get(options: { url: string, params?: Object | null, headers?: Object | null }): Promise<HttpResponse>;

    post(options: { url: string, body: Object | null, params?: Object | null, headers?: Object | null }): Promise<HttpResponse>;

    delete(options: { url: string, params?: Object | null, headers?: Object | null }): Promise<HttpResponse>;

    put(options: { url: string, body: Object | null, params?: Object | null, headers?: Object | null }): Promise<HttpResponse>;

    options(options: { url: string, params?: Object | null, headers?: Object | null }): Promise<HttpResponse>;

    head(options: { url: string, params?: Object | null, headers?: Object | null }): Promise<HttpResponse>;

    setBasicAuth(options: { host: string, username: string, password: string }): Promise<any>;

    getBasicAuth(options: { host: string }): Promise<{ value: string }>;

    setHeader(options: { host: string, header: string, value: string }): Promise<any>;

    getHeaders(options: { host: string }): Promise<{ value: any }>;

    setDataSerializer(options: { serializer: HttpDataSerializerType }): Promise<any>;

    getDataSerializer(): Promise<{ value: string }>;

    setRequestTimeout(options: { timeout: number }): Promise<any>;

    setCookie(options: { host: string, cookie: string }): Promise<any>

    getCookieString(options: { host: string }): Promise<{ value: string }>;

    clearCookies(): Promise<any>;

    removeCookies(options: { host: string }): Promise<any>;
}

export interface HttpRequest {
    method: HttpRequestMethod,
    url: string,
    body: Object | null,
    params: Object | null
    headers: Object | null
}

export interface HttpResponse {
    status: number;
    headers: Object;
    url: string;
    data?: any;
    error?: string
}

export enum HttpRequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD'
}
