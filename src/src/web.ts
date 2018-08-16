import { WebPlugin } from '@capacitor/core';
import { HttpPluginPlugin } from './definitions';

export class HttpPluginWeb extends WebPlugin implements HttpPluginPlugin {
  constructor() {
    super({
      name: 'HttpPlugin',
      platforms: ['web']
    });
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return Promise.resolve({ value: options.value });
  }
}

const HttpPlugin = new HttpPluginWeb();

export { HttpPlugin };
