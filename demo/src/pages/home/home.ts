import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, HttpRequestMethod } from '@teamhive/capacitor-http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  http: Http;

  constructor(public navCtrl: NavController) {
    this.http = new Http();
  }

  async ngOnInit() {
    const host = 'http://requestbin.fullcontact.com/vffejmvf';
    await this.http.setBasicAuth({
      host: host,
      username: 'guest',
      password: 'guest'
    });

    await this.http.setHeader({
      host: host,
      header: 'OutSider-Header',
      value: 'Something'
    });


    await this.http.setCookie({
      host: host,
      cookie: 'yummy_cookie=choco'
    });

    await this.http.setCookie({
      host: host,
      cookie: 'tasty_cookie=strawberry'
    });

    this.http.request({
      body: {firstName: 'Osei', lastName: 'fortune'},
      method: HttpRequestMethod.POST,
      headers: {'X': 'TEST-X'},
      params: {'stuff': 'Yes'},
      url: host
    }).then(response => {
      console.log('request response', response);
    });


    this.http.post({
      body: {type: 'post'},
      params: null,
      url: host,
      headers: null
    }).then(response => {
      console.log('post response', response);
    });


    this.http.put({
      body: {type: 'put'},
      headers: null,
      params: null,
      url: host
    }).then(response => {
      console.log('put response', response);
    });


    this.http.get({
      headers: {'X': 'TEST-X'},
      params: {'stuff': 'Yes'},
      url: host
    }).then(response => {
      console.log('get response', response);
    });
    

    this.http.head({
      headers: null,
      params: null,
      url: host
    }).then(response => {
      console.log('head response', response);
    });

    this.http.options({
      headers: {'X': 'TEST-X'},
      params: {'stuff': 'Yes'},
      url: host
    }).then(response => {
      console.log('options response', response);
    });

    this.http.delete({
      headers: null,
      params: null,
      url: host
    }).then(response => {
      console.log('delete response', response);
    });


  }


}
