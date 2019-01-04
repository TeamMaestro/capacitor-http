import { HttpDataSerializerType, HttpRequest, HttpResponse, IHttp } from './definitions';
import { Plugins } from '@capacitor/core';

export class Http implements IHttp {

    delete(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return Plugins.Http.delete(options);
    }

    get(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return Plugins.Http.get(options);
    }

    head(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return Plugins.Http.head(options);
    }

    options(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return Plugins.Http.options(options);
    }

    post(options: { url: string; body: Object | null; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return Plugins.Http.post(options);
    }

    put(options: { url: string; body: Object | null; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return Plugins.Http.put(options);
    }

    request(options: HttpRequest): Promise<HttpResponse> {
        return Plugins.Http.request(options);
    }

    clearCookies(): Promise<any> {
        return Plugins.Http.clearCookies();
    }

    getBasicAuth(options: { host: string }): Promise<{ value: string }> {
        return Plugins.Http.getBasicAuth(options);
    }

    getCookieString(options: { host: string }): Promise<{ value: string }> {
        return Plugins.Http.getCookieString(options);
    }

    getDataSerializer(): Promise<{ value: string }> {
        return Plugins.Http.getDataSerializer();
    }

    getHeaders(options: { host: string }): Promise<{ value: any }> {
        return Plugins.Http.getHeaders(options);
    }

    removeCookies(options: { host: string }): Promise<any> {
        return Plugins.Http.removeCookies(options);
    }

    setBasicAuth(options: { host: string; username: string; password: string }): Promise<any> {
        return Plugins.Http.setBasicAuth(options);
    }

    setDataSerializer(options: { serializer: HttpDataSerializerType }): Promise<any> {
        return Plugins.Http.setDataSerializer(options);
    }

    setHeader(options: { host: string; header: string; value: string }): Promise<any> {
        return Plugins.Http.setHeader(options);
    }

    setRequestTimeout(options: { timeout: number }): Promise<any> {
        return Plugins.Http.setRequestTimeout(options);
    }

    setCookie(options: { host: string; cookie: string }): Promise<any> {
        return Plugins.Http.setCookie(options);
    }

}
