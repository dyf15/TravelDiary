import { HomePage } from './../home/home';
/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />


import { Component, ViewChild, NgZone } from '@angular/core';

import { NavController, NavParams, PopoverController, Slides } from 'ionic-angular';

import { PopoverPage } from './../diaryDetail/popover';

export type Item = {
  orderId: number,    // 取得順序管理用
  body: any           // 取得データ本体（任意の内容）
}

type DiaryDetail = {
  diary_detail_id: string,
  tag_id: string,
  photo: string,
  latitude: number,
  longitude: number,
  spot: string,
  comment: string,
  diary_id: string,
  tag_name: string,
  count_com_num: string,
  count_fav_num: string,
  flag: number,
  color: string
}

type Diary = {
  favs: number,
  items: Item[],
}

@Component({
  selector: 'page-diaryDetail',
  templateUrl: 'diaryDetail.html',


})

export class DiaryDetailPage {
  @ViewChild('mySlider') slider: Slides;

  // Item 一覧（本体取得用）
  itemIndexes: Item[] = []
  // Item 本体
  items: Item[] = []
  // Item 総数（取得成功数、※itemIndexesは要求数）
  itemCount: number = 0

  diarysDetails: DiaryDetail[] = [];

  pageNum: number;
  //sdiary_id: string;
  slideOptions: any;

  //日記情報
  diary_info: any;

  sliderLength: number;

  root: HomePage;

  fav_flag: number = 1;
  //changeNum: string; 
  // public test: String;
  constructor(private navCtrl: NavController, private navParams: NavParams, public popoverCtrl: PopoverController, private zone: NgZone) {
    this.slideOptions = {
      initialSlide: 0,
    };
    this.diary_info = navParams.get('item');

    this.root = navParams.get('root')


    this.pageNum = 0;
    console.log(" Num" + this.pageNum);

  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex() + 1;
    console.log(currentIndex);
    this.pageNum = currentIndex;
    console.log("slidechanged Num" + this.pageNum);
  }

  // getAllSliderLenght() {
  //   this.sliderLength = this.slider.length();
  //   console.log("all" + this.slider.length());
  //   //return this.slider.length();
  // }


  popoverOnClick(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, { detail: this, diary_info_lat: this.diary_info.lat, diary_info_lng: this.diary_info.lng });
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    //SET TIME OUT !!!必ず書く
    setTimeout(() => {
      this.getDiaryDetailID()
    }, 500);

  }


  getDiaryDetailID() {
    let request = new WLResourceRequest('/adapters/sqlAdapter/getDiaryDetailID', WLResourceRequest.GET);
    request.setQueryParameter('params', '["' + this.diary_info.diary_id + '"]');

    request.send().then(
      // 成功時
      (response) => {
        let indexes = response.responseJSON.resultSet;
        // リスト初期化
        this.items = []
        this.itemIndexes = []
        this.itemCount = 0

        // 詳細取得呼び出し
        for (var i = 0; i < indexes.length; i++) {
          // 一覧の要素
          let body = indexes[i]

          // 一覧の取得順
          let orderId = i + 1

          // 一覧に取得順（orderId）を付与
          this.itemIndexes.push({
            orderId: orderId,
            body: body
          })
          // 取得予定総数に足す
          this.itemCount += 1
          // alert(JSON.stringify(indexes));
          // 詳細取得
          this.getDiaryDetailInfo(orderId, this.diary_info.diary_id, body.diary_detail_id)
        }
      },
      // 失敗時
      (error) => {
        //   alert('日記詳細取得失敗しました');

      }
    );
  }
  // 値取得
  getDiaryDetailInfo(orderId, diary_id, diary_detail_id) {

    //let request = new WLResourceRequest('/adapters/sqlAdapter/getDiaryDetailInfo', WLResourceRequest.GET);
    let request = new WLResourceRequest('/adapters/sqlAdapter/getDetailInfoFag', WLResourceRequest.GET);


    request.setQueryParameter('params', '["' + 6 + '","' + diary_id + '", "' + diary_detail_id + '"]');
    // alert('取得' + diary_detail_id)
    request.send().then(
      // 成功時
      (response) => {
        let result = response.responseJSON;
        // let results: Diary[] = [];
        this.zone.run(() => {
          if (result.resultSet.length > 0) {
            let rs = result.resultSet[0];
            this.items.push({
              orderId: orderId,
              body: {

                diary_detail_id: rs.diary_detail_id,
                tag_id: rs.tag_id,
                tag_name: rs.tag_name,
                diary_id: rs.diary_id,
                photo: rs.photo,
                //title: rs.title,
                comment: rs.comment,
                latitude: rs.latitude,
                longitude: rs.longitude,
                spot: rs.spot,
                count_fav_num: rs.count_fav_num,
                count_com_num: rs.count_com_num,
                flag: rs.FAV_FLG,
                color: rs.FAV_FLG > 0 ? '#07090c' : '#FF8C00'
                // name: "name" + i

              }

            });


          }
        });

        //alert(JSON.stringify(this.items));
      },
      // 失敗時
      (error) => {
        this.itemCount -= 1
        //  alert(JSON.stringify(error));
        //  alert('日記情報取得失敗しました');
      }
    );

  }


  show(detail_id) {
    alert('click -> ' + detail_id);
  }


  fav(item) {
    //this.setFav(item)
    //alert(item.body.flag)
    if (item.body.flag == 1) {
      this.setFav(item)
      item.body.flag = -1
      item.body.color = '#FF8C00'

      this.zone.run(() => {
        item.body.count_fav_num = item.body.count_fav_num + this.fav_flag;
        this.diary_info.fav_num = this.diary_info.fav_num + this.fav_flag;

      });
    }
    else {
      this.delFav(item)
      item.body.flag = 1
      item.body.color = '#07090c'
      this.zone.run(() => {
        item.body.count_fav_num = item.body.count_fav_num - this.fav_flag;
        this.diary_info.fav_num = this.diary_info.fav_num - this.fav_flag;

      });
    }

  }

  setFav(item) {
    //alert('click -> ' + JSON.stringify(item.body.diary_detail_id));
    let request = new WLResourceRequest('/adapters/sqlAdapter/setFav', WLResourceRequest.POST);
    request.setQueryParameter('params', '["' + 6 + '","' + item.body.diary_detail_id + '"]');
    request.send().then(
      // 成功時
      (response) => {

        // alert('登録成功しました');
        // this.showAddDiaryDetail();

        // }

      },
      // 失敗時
      (error) => {
        //  this.disabled_btn = false;
        //alert('PROCEDURE ERROR : ' + '["' + item.diary_id + '","' + item.title + '","' + item.comment + '","' + item.tag_id + '","' + item.country_id + '","' + item.spot + '","' + item.introduction + '"]');
        // alert('登録エラーです　：　　' + JSON.stringify(error));
        //  alert('登録失敗しました');
      }
    );

  }



  delFav(item) {
    //alert('click -> ' + JSON.stringify(item.body.diary_detail_id));
    let request = new WLResourceRequest('/adapters/sqlAdapter/delFav', WLResourceRequest.POST);
    request.setQueryParameter('params', '["' + 6 + '","' + item.body.diary_detail_id + '"]');
    request.send().then(
      // 成功時
      (response) => {

        // alert('登録成功しました');
        // this.showAddDiaryDetail();

        // }

      },
      // 失敗時
      (error) => {
        //  this.disabled_btn = false;
        //alert('PROCEDURE ERROR : ' + '["' + item.diary_id + '","' + item.title + '","' + item.comment + '","' + item.tag_id + '","' + item.country_id + '","' + item.spot + '","' + item.introduction + '"]');
        // alert('登録エラーです　：　　' + JSON.stringify(error));
        //  alert('登録失敗しました');
      }
    );

  }










  selectFav(detail_id): number {
    //alert('detail_id' + detail_id)
    var flag;
    let request = new WLResourceRequest('/adapters/sqlAdapter/selFav', WLResourceRequest.POST);
    request.setQueryParameter('params', '["' + 6 + '","' + detail_id + '"]');
    request.send().then(
      // 成功時
      (response) => {
        let index = response.responseJSON.resultSet;
        if (index.length == 0) {
          // this.fav_flag = 1
          // alert('0 -> ' + this.fav_flag)
          // this.setFav(item)

          flag = 1;
        }
        else {
          // this.fav_flag = -this.fav_flag; 
          // this.fav_flag = -1
          // this.delFav(item)
          // alert('1 -> ' + this.fav_flag)
          flag = -1;
        }
        // alert('登録成功しました');
        // this.showAddDiaryDetail();
        // alert(JSON.stringify(response));
        // }



      },
      // 失敗時
      (error) => {
        flag = -1;
        //  this.disabled_btn = false;
        //alert('PROCEDURE ERROR : ' + '["' + item.diary_id + '","' + item.title + '","' + item.comment + '","' + item.tag_id + '","' + item.country_id + '","' + item.spot + '","' + item.introduction + '"]');
        //alert('登録エラーです　：　　' + JSON.stringify(error));
        //  alert('登録失敗しました');
      }
    );
    return flag;
  }

}
