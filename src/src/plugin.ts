import { HttpRequest, HttpResponse, IHttp } from './definitions';
import { Plugins } from '@capacitor/core';

const {HttpPlugin} = Plugins;

export class Http implements IHttp {

    delete(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return HttpPlugin.delete(options);
    }

    get(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return HttpPlugin.get(options);
    }

    head(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return HttpPlugin.head(options);
    }

    options(options: { url: string; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return HttpPlugin.options(options);
    }

    post(options: { url: string; body: Object | null; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return HttpPlugin.post(options);
    }

    put(options: { url: string; body: Object | null; params?: Object | null; headers?: Object | null }): Promise<HttpResponse> {
        return HttpPlugin.put(options);
    }

    request(options: HttpRequest): Promise<HttpResponse> {
        return HttpPlugin.request(options);
    }


    clearCookies(): Promise<any> {
        return HttpPlugin.clearCookies();
    }

    getBasicAuth(options: { host: string }): Promise<{ value: string }> {
        return HttpPlugin.getBasicAuth(options);
    }

    getCookieString(options: { host: string }): Promise<{ value: string }> {
        return HttpPlugin.getCookieString(options);
    }

    getDataSerializer(): Promise<{ value: string }> {
        return HttpPlugin.getDataSerializer();
    }

    getHeaders(options: { host: string }): Promise<{ value: any }> {
        return HttpPlugin.getHeaders(options);
    }

    removeCookies(options: { host: string }): Promise<any> {
        return HttpPlugin.removeCookies(options);
    }

    setBasicAuth(options: { host: string; username: string; password: string }): Promise<any> {
        return HttpPlugin.setBasicAuth(options);
    }

    setDataSerializer(options: { serializer: 'text' | 'json' | 'urlencoded' }): Promise<any> {
        return HttpPlugin.setDataSerializer(options);
    }

    setHeader(options: { host: string; header: string; value: string }): Promise<any> {
        return HttpPlugin.setHeader(options);
    }

    setRequestTimeout(options: { timeout: number }): Promise<any> {
        return HttpPlugin.setRequestTimeout(options);
    }

    setCookie(options: { host: string; cookie: string }): Promise<any> {
        return HttpPlugin.setCookie(options);
    }

}
