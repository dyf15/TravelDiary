/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />

import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { ChatPage } from '../chat/chat';
import { DiaryDetailPage } from './../diaryDetail/diaryDetail';

export type Item = {
  orderId: number,    // 取得順序管理用
  body: any           // 取得データ本体（任意の内容）
}

type Diary = {
  diary_id: string,
  diary_img: string,
  tag_id: string,
  tag_name: string,
  title: string,
  comment: string,
  user_id: string,
  user_img: string,
  user_name: string,
  fav_num: string,
  comment_num: string,
  introduction: string,
  lat: number,
  lng: number
}

// type DiaryID = {
//   diary_id: string
// }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  // Item 一覧（本体取得用）
  itemIndexes: Item[] = []
  // Item 本体
  items: Item[] = []
  // Item 総数（取得成功数、※itemIndexesは要求数）
  itemCount: number = 0

  ids: Diary[] = [];
  diarys: Diary[] = [];
  test1 = 'yyy';
  constructor(private navCtrl: NavController, private zone: NgZone, public loadingCtrl: LoadingController) {

    //getDiaryInfo();
  }

  ionViewDidLoad() {
    //SET TIME OUT !!!必ず書く
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      duration: 3000
    });
    loader.present();

    setTimeout(() => {
      this.getDiaryID()
    }, 500);


  }



  //ページ遷移
  openChatPage() {
    this.navCtrl.push(ChatPage);
  }

  openSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  goToDiaryDetailPage(item) {

    // this.navCtrl.push(DiaryDetailPage, { item: item });
    this.navCtrl.push(DiaryDetailPage, { item: item, root: this });

  }

  getDiaryID() {
    let request = new WLResourceRequest('/adapters/sqlAdapter/getDiaryID', WLResourceRequest.GET);
    //  request.setQueryParameter('params', '[1]');
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

          // 詳細取得
          this.getDiaryTopInfoDetail(orderId, body.diary_id)
        }
      },
      // 失敗時
      (error) => {
        // alert('旅行記取得失敗しました');

      }
    );
  }


  test() {

    let request = new WLResourceRequest('/adapters/sqlAdapter/getDiaryID', WLResourceRequest.GET);
    //  request.setQueryParameter('params', '[1]');
    request.send().then(
      // 成功時
      (response) => {
        this.ids = response.responseJSON.resultSet;
        this.diarys = []
        this.ids.forEach(id => {
          // this.getDiaryTopInfoDetail(id.diary_id)
        })

      },
      // 失敗時
      (error) => {
        alert(JSON.stringify(error));

      }
    );

  }


  getDiaryTopInfoDetail(orderId, diary_id) {
    // alert('getDetail' + diary_id);
    let request = new WLResourceRequest('/adapters/sqlAdapter/getDiary', WLResourceRequest.GET);
    request.setQueryParameter('params', '[' + diary_id + ']');
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
                diary_id: rs.diary_id,
                diary_img: rs.photo,
                tag_id: rs.tag_id,
                tag_name: rs.tag_name,
                title: decodeURIComponent(atob(rs.title)),
                comment: decodeURIComponent(atob(rs.comment)),
                user_id: rs.user_id,
                user_img: rs.user_img,
                user_name: rs.user_name,
                fav_num: rs.fav_num,
                comment_num: rs.comment_num,
                introduction: decodeURIComponent(atob(rs.introduction)),
                lat: rs.lat,
                lng: rs.lng
                // name: "name" + i

              }

            });
            // alert('cooment '+ decodeURIComponent(atob(rs.comment)));
          }
        });

      },
      // 失敗時
      (error) => {
        // 詳細取得に失敗すれば、予定の総数から引く
        this.itemCount -= 1
        alert(JSON.stringify(error));
        //  alert('旅行記取得失敗しました');
      }
    );

  }

  dump(obj: any): string {
    return JSON.stringify(obj)
  }


  /**
  * ページリロード 
  */
  refresh(refresher): void {
    // let loader = this.loadingCtrl.create({
    //   content: 'Loading...',
    //   duration: 1000
    // });
    // loader.present();
    setTimeout(() => {
      // event.complete();
      // location.reload();
      this.getDiaryID()
      refresher.complete();
    }, 500);
  }
}
