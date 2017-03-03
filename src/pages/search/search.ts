/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />

import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

// type Continent = {
//   continent_id: String,
//   continent: String
// }


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  //  private searchCountry: String = null;
  //  private searchTag: String = null;

  items;
  //Continents: Continent[] = [];

  constructor(public navCtrl: NavController, private zone: NgZone) {
    this.ContinentItems();
  }

  ContinentItems() {
    this.items = [
      'アジア',
      'アフリカ',
      'ヨーロッパ',
      'Abc',
      'abc'
    ];
  }

  getItems(event) {
    this.ContinentItems();

    var val = event.target.value;
    //if (val && val.trim() != '') {
    //前後空白を消して、空ではない
    if (val.trim() != '') {
      //各要素に対して、指定した条件を満たす要素だけを含む配列を返す
      this.items = this.items.filter((item) => {

        //要素が部分一致しているかどうか(英字を想定し
        //全部小文字に変換後検索かける)
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //return item.indexOf(val) > -1;
      });
    }
  }
}
