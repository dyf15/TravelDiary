/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />

import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

type Country = {
  id: string,
  name: string
}


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'

})
export class ChatPage {

  countrys: Country[] = [];

  constructor(private navCtrl: NavController, private zone: NgZone) {



  }

  connect(event: any) {
    WLAuthorizationManager.obtainAccessToken().then(
      // 成功した時
      (response) => {
        alert(JSON.stringify(response));

      },

      // 失敗した時
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

  // データベース
  getUsers(event: any) {

    let request = new WLResourceRequest('/adapters/sqlAdapter/procedure1', WLResourceRequest.GET);
    request.setQueryParameter('params', '[1]');
    request.send().then(
      // 成功時
      (response) => {
        let result = response.responseJSON;

        if (result.isSuccessful) {
          let results: Country[] = [];

          for (let i = 0; i < result.resultSet.length; i++) {
            let rs = result.resultSet[i];
            results.push({
              id: rs.country_id,
              name: rs.country
              // name: "name" + i
            });

            // alert(JSON.stringify(response));
          }

          this.zone.run(() => {
            this.countrys = results;
          });
          alert(JSON.stringify(result));
        } else {
          alert(JSON.stringify(response));

        }
      },
      // 失敗時
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

}



