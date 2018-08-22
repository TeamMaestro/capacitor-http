# Capacitor Http


## Usage

### TypeScript


```typescript
import { Http } from '@teamhive/capacitor-http';

const http = new Http();

const person = await this.http.get({
      url: 'https://randomuser.me/api/'
});
const data = person.data;
```


## Api

| Method                                   | Default | Type                         | Description                                           |
| ---------------------------------------- | ------- | ---------------------------- | ----------------------------------------------------- |
| request(options: HttpRequest)            |         | `Promise<HttpResponse>`                     |  |
| get(options: { url: string, params?: Object, headers?: Object })                    |         | `Promise<HttpResponse>`                 |                    |
| post(options: { url: string, body: Object, params?: Object, headers?: Object })   |         | `Promise<HttpResponse>` |                               |  |
| delete(options: { url: string, params?: Object, headers?: Object })                       |         | `Promise<HttpResponse>`                       |                               |
| put(options: { url: string, body: Object, params?: Object, headers?: Object })                       |         | `Promise<HttpResponse>`                       |                              |
| options(options: { url: string, params?: Object, headers?: Object })                       |         | `Promise<HttpResponse>`                       |                                |
| head(options: { url: string, params?: Object, headers?: Object })                    |         | `Promise<HttpResponse>`                       |                  |
| setBasicAuth(options: { host: string, username: string, password: string })                  |         | `Promise<any>`                 |                    |
| getBasicAuth(options: { host: string })  |         | `Promise<{ value: string }>` |                               |  |
| setHeader(options: { host: string, header: string, value: string })                       |         | `Promise<any>`                       |                              |
| getHeaders(options: { host: string })                       |         | `Promise<{ value: any }>`                       |                             |
| setDataSerializer(options: { serializer: HttpDataSerializerType })                       |         | `Promise<any> `                       |                              |
| getDataSerializer()                    |         | `Promise<{ value: string }>`                       |                  |
| setRequestTimeout(options: { timeout: number })                |         | `Promise<any> `                 |                    |
| setCookie(options: { host: string, cookie: string })  |         | `Promise<any>` |                               |  |
| getCookieString(options: { host: string })                       |         | `Promise<{ value: string }>`                       |                          |
| clearCookies()                      |         | `Promise<any>`                       |                             |
| removeCookies(options: { host: string })                    |         | `Promise<any>`                       |                              |
