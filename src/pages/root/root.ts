import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

type latLng =
  {
    lat: number,
    lng: number,
    spot: string
  }

@Component({
  selector: 'page-root',
  templateUrl: 'root.html'
})

export class RootPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker = [];
  infoWindow = [];
  detail: any;
  mapInfos: latLng[] = [
    // {
    // lat: 34.693738, // 緯度
    // lng: 135.502165, // 経度
    // title: '大阪'
    // },
    // {
    // lat: 34.691269, // 緯度
    // lng: 135.183071, // 経度
    // title: '兵庫'
    // }
  ];
  lat: number;
  lng: number;
  constructor(private navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    this.mapInfos = navParams.get('mapInfos');
    this.lat = navParams.get('lat');
    this.lng = navParams.get('lng');
    // this.getMapInfo
    //alert(JSON.stringify(this.detail.body))
    //alert(this.detail);
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {

    let latLng = new google.maps.LatLng(this.lat, this.lng);

    let mapOptions = {
      center: latLng,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //this.marker = new Array();
    for (var i = 0; i < this.mapInfos.length; i++) {

      this.marker[i] = new google.maps.Marker({ // マーカーの追加
        position: new google.maps.LatLng(this.mapInfos[i].lat, this.mapInfos[i].lng), // マーカーを立てる位置を指定
        map: this.map, // マーカーを立てる地図を指定
        title: this.mapInfos[i].spot,

      });
      //  this.infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
      //         content:  this.items[i].title// 吹き出しに表示する内容
      //     });

      //     this.markerEvent(i); // マーカーにクリックイベントを追加

      //  this.markerInfo(this.marker[i], this.marker[i].title);

    }


    // }
    //  var infowindow = new google.maps.InfoWindow({
    //     content: name
    //   });

  }

  getMapInfo() {
    let info = this.detail;

    for (var i = 0; i < info.length; i++) {
      alert(info[i].body.diary_detail_id)
    }
  }




  close() {
    this.viewCtrl.dismiss();
  }
}

