import { WebPlugin } from '@capacitor/core';
import { HttpRequest, HttpResponse, IHttp } from './definitions';


export class HttpPluginWeb extends WebPlugin implements IHttp {
    constructor() {
        super({
            name: 'HttpPlugin',
            platforms: ['web']
        });
    }

    clearCookies(): Promise<any> {
        return undefined;
    }

    delete(options: { url: string; params: Object | null; headers: Object | null }): Promise<HttpResponse> {
        return Promise.resolve(options) as any;
    }

    get(options: { url: string; params: Object | null; headers: Object | null }): Promise<HttpResponse> {
        return Promise.resolve(options) as any;
    }

    getBasicAuth(options: { host: string }): Promise<{ value: string }> {
        return Promise.resolve(options) as any;
    }

    getCookieString(options: { host: string }): Promise<{ value: string }> {
        return Promise.resolve(options) as any;
    }

    getDataSerializer(): Promise<{ value: string }> {
        return undefined;
    }

    getHeaders(options: { host: string }): Promise<{ value: any }> {
        return Promise.resolve(options) as any;
    }

    head(options: { url: string; params: Object | null; headers: Object | null }): Promise<HttpResponse> {
        return Promise.resolve(options) as any;
    }

    options(options: { url: string; params: Object | null; headers: Object | null }): Promise<HttpResponse> {
        return Promise.resolve(options) as any;
    }

    post(options: { url: string; body: Object | null; params: Object | null; headers: Object | null }): Promise<HttpResponse> {
        return Promise.resolve(options) as any;
    }

    put(options: { url: string; body: Object | null; params: Object | null; headers: Object | null }): Promise<HttpResponse> {
        return Promise.resolve(options) as any;
    }

    removeCookies(options: { host: string }): Promise<any> {
        return Promise.resolve(options) as any;
    }

    request(options: HttpRequest): Promise<HttpResponse> {
        return Promise.resolve(options) as any;
    }

    setBasicAuth(options: { host: string; username: string; password: string }): Promise<any> {
        return Promise.resolve(options) as any;
    }

    setDataSerializer(options: { serializer: 'text' | 'json' | 'urlencoded' }): Promise<any> {
        return Promise.resolve(options) as any;
    }

    setHeader(options: { host: string; header: string; value: string }): Promise<any> {
        return Promise.resolve(options) as any;
    }

    setRequestTimeout(options: { timeout: number }): Promise<any> {
        return Promise.resolve(options) as any;
    }

    setCookie(options: { host: string; cookie: string }): Promise<any> {
        return Promise.resolve(options) as any;
    }

}

const HttpPlugin = new HttpPluginWeb();

export { HttpPlugin };
