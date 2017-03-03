import { DiaryDetailPage } from './diaryDetail';
import { Component } from '@angular/core';

import { ViewController, NavParams, NavController, ModalController } from 'ionic-angular';

import { OutlinePage } from './../outline/outline';
import { RootPage } from './../root/root';

type mapInfo = {

  lat: number,
  lng: number,
  spot: string
}


@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {
  detail: DiaryDetailPage;
  mapInfos: mapInfo[] = [];
  diary_info_lat: number;
  diary_info_lng: number;

  constructor(private navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.detail = navParams.get('detail');
    this.diary_info_lat = navParams.get('diary_info_lat');
    this.diary_info_lng = navParams.get('diary_info_lng');
  }

  //ページ遷移
  //もくじ
  openOutlinePage() {
    let modal = this.modalCtrl.create(OutlinePage, { detail: this.detail });
    modal.present();
    //this.navCtrl.push(OutlinePage);
  }

  //ルート
  openRootPage() {
    //  let modal = this.modalCtrl.create(RootPage,{detail: this.detail});
    //modal.present();
    for (var i = 0; i < this.detail.items.length; i++) {

      // alert('show -> ' + JSON.stringify(this.detail.items[i].body.latitude))
      this.mapInfos.push({
        lat: this.detail.items[i].body.latitude,
        lng: this.detail.items[i].body.longitude,
        spot: this.detail.items[i].body.spot
      })

    }

    this.navCtrl.push(RootPage, { mapInfos: this.mapInfos, lat: this.diary_info_lat, lng: this.diary_info_lng });
  }

  close() {
    this.viewCtrl.dismiss();
  }


}
