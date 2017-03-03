/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />

import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

export type Item = {
  orderId: number,    // 取得順序管理用
  body: any           // 取得データ本体（任意の内容）
}
type User = {
  id: string,
  name: string,
  user_img: string
}

type Diary = {
  diary_id: string,
  photo: string,
  title: string,
  count_detail: string
}
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html'

})
export class MyPage {

  // Item 一覧（本体取得用）
  itemIndexes: Item[] = []
  // Item 本体
  items: Item[] = []
  // Item 総数（取得成功数、※itemIndexesは要求数）
  itemCount: number = 0


  //fav

  detailIndexes: Item[] = []
  details: Item[] = []
  detailCount: number = 0


  userinfos: User[] = []
  ids: Diary[] = []
  diarys: Diary[] = []
  constructor(private navCtrl: NavController, private zone: NgZone, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    //SET TIME OUT !!!必ず書く
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      duration: 900
    });
    loader.present();
    setTimeout(() => {
      this.getUserInfo()

    }, 500);
  }

  // ionViewWillEnter() {
  //    //SET TIME OUT !!!必ず書く
  //   let loader = this.loadingCtrl.create({
  //     content: 'Loading...',
  //     duration: 2000
  //   });
  //   loader.present();

  //     setTimeout(() => {
  //     this.getUserInfo()
  //   }, 500);
  // }
  // 値取得
  getUserInfo() {

    let request = new WLResourceRequest('/adapters/sqlAdapter/getUserInfo', WLResourceRequest.POST);
    //let request = new WLResourceRequest('/adapters/sqlAdapter/getDiaryID', WLResourceRequest.POST);

    //今ユーザーは固定値
    request.setQueryParameter('params', '[6]');
    request.send().then(
      // 成功時
      (response) => {
        let result = response.responseJSON;

        if (result.isSuccessful) {
          let results: User[] = [];

          for (let i = 0; i < result.resultSet.length; i++) {
            let rs = result.resultSet[i];
            results.push({

              id: rs.user_id,
              name: rs.user_name,
              user_img: rs.user_img
              // name: "name" + i
            });

            // alert(JSON.stringify(response));

          }

          this.zone.run(() => {
            this.userinfos = results;

          });
          console.log(JSON.stringify(response));
          //  alert(JSON.stringify(result));
        } else {
          // alert(JSON.stringify(response));

        }
        //  alert(JSON.stringify(response));
      },
      // 失敗時
      (error) => {
        // alert('ユーザー情報取得失敗しました');

      }
    );

  }

  delDiaryOnClick(diary) {

    var diary_id = diary.body.diary_id;

    //alert('diary_id : ' + diary_id + 'title :' + diary.title)
    let alert = this.alertCtrl.create({
      title: '確認',
      message: '「' + diary.body.title + '」を本当に削除しますか？',
      buttons: [
        {
          text: 'いいえ',
          role: 'cancel',
          handler: () => {

            console.log('Cancel clicked');

          }
        },
        {
          text: 'はい',
          handler: () => {

            this.delDiary(diary_id);
            //   this.getDiaryInfo();
            let loader = this.loadingCtrl.create({
              content: 'Loading...',
              duration: 900
            });
            loader.present();

            setTimeout(() => {
              this.getDiaryID()
            }, 500);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();


  }


  delDiary(diary_id) {
    let request = new WLResourceRequest('/adapters/sqlAdapter/delDiary', WLResourceRequest.GET);
    //diary_idを渡す
    request.setQueryParameter('params', '["' + diary_id + '"]');
    request.send().then(
      // 成功時
      (response) => {
        let result = response.responseJSON;

        if (result.isSuccessful) {
          let results: User[] = [];

          for (let i = 0; i < result.resultSet.length; i++) {
            let rs = result.resultSet[i];
            results.push({

              id: rs.user_id,
              name: rs.user_name,
              user_img: rs.user_img
              // name: "name" + i
            });

            // alert(JSON.stringify(response));

          }

          this.zone.run(() => {
            this.userinfos = results;

          });
          console.log(JSON.stringify(response));
          //  alert(JSON.stringify(result));
        } else {
          // alert(JSON.stringify(response));

        }
        // alert(JSON.stringify(response));
      },
      // 失敗時
      (error) => {
        // alert(JSON.stringify(error));
        //alert('旅行記削除に失敗しました');
      }
    );
  }


  getDiaryID() {
    let request = new WLResourceRequest('/adapters/sqlAdapter/getDiaryID', WLResourceRequest.GET);
    request.setQueryParameter('params', '[6]');
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
          this.getUserAddDiary(orderId, body.diary_id)
        }


        // this.diarys = []
        // this.ids.forEach(id => {
        //   this.getUserAddDiary(id.diary_id)
        // })
      },
      // 失敗時
      (error) => {
        // alert(JSON.stringify(error));
        //  alert('旅行記取得失敗しました');

      }
    );
  }

  getUserAddDiary(orderId, diary_id) {
    // 値取得


    // let request = new WLResourceRequest('/adapters/sqlAdapter/getUserAddDiaryList', WLResourceRequest.GET);
    let request = new WLResourceRequest('/adapters/sqlAdapter/getUserAddDiaryList', WLResourceRequest.GET);

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
                photo: rs.photo,
                title: decodeURIComponent(atob(rs.title)),
                count_detail: rs.count_detail
                // name: "name" + i
              }
            });
          }
        });
      },
      // 失敗時
      (error) => {
        this.itemCount -= 1
        //alert(JSON.stringify(error));
        //alert('旅行記取得に失敗しました');
      }
    );

  }

  // refresh(refresher): void {
  //   // let loader = this.loadingCtrl.create({
  //   //   content: 'Loading...',
  //   //   duration: 1000
  //   // });
  //   // loader.present();
  //   //setTimeout(() => {
  //     // event.complete();
  //     // location.reload();
  //      setTimeout(() => {
  //         this.getDiaryID()
  //     this.getUserInfo()

  //     refresher.complete();
  //   }, 500);
  // }


  // //   }, 500);

  getUserFavDetailID() {
    let request = new WLResourceRequest('/adapters/sqlAdapter/getUserFavDetailID', WLResourceRequest.GET);
    request.setQueryParameter('params', '[6]');
    request.send().then(
      // 成功時
      (response) => {
        let indexes = response.responseJSON.resultSet;

        // リスト初期化
        this.details = []
        this.detailIndexes = []
        this.detailCount = 0



        // 詳細取得呼び出し
        for (var i = 0; i < indexes.length; i++) {
          // 一覧の要素
          let body = indexes[i]

          // 一覧の取得順
          let orderId = i + 1

          // 一覧に取得順（orderId）を付与
          this.detailIndexes.push({
            orderId: orderId,
            body: body
          })
          // 取得予定総数に足す
          this.detailCount += 1

          // 詳細取得
          this.getUserFavDetailInfo(orderId, body.diary_detail_id)
        }


        // this.diarys = []
        // this.ids.forEach(id => {
        //   this.getUserAddDiary(id.diary_id)
        // })
      },
      // 失敗時
      (error) => {
        // alert(JSON.stringify(error));
        //  alert('旅行記取得失敗しました');

      }
    );
  }

  getUserFavDetailInfo(orderId, detail_id) {
    // 値取得


    // let request = new WLResourceRequest('/adapters/sqlAdapter/getUserAddDiaryList', WLResourceRequest.GET);
    let request = new WLResourceRequest('/adapters/sqlAdapter/getUserFavDetailInfo', WLResourceRequest.GET);

    request.setQueryParameter('params', '[' + detail_id + ']');
    request.send().then(
      // 成功時
      (response) => {
        let result = response.responseJSON;
        // let results: Diary[] = [];
        this.zone.run(() => {
          if (result.resultSet.length > 0) {
            let rs = result.resultSet[0];
            this.details.push({
              orderId: orderId,
              body: {

                detail: rs.diary_detail_id,
                photo: rs.photo,
                spot: rs.spot,
                //count_detail: rs.count_detail
                // name: "name" + i
              }
            });
          }
        });
        //alert(JSON.stringify(response));
      },
      // 失敗時
      (error) => {
        this.detailCount -= 1
        //alert(JSON.stringify(error));
        //alert('旅行記取得に失敗しました');
      }
    );

  }


  refresh(refresher): void {
    // let loader = this.loadingCtrl.create({
    //   content: 'Loading...',
    //   duration: 1000
    // });
    // loader.present();

    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      duration: 2000
    });
    loader.present();
    setTimeout(() => {
      // event.complete();
      // location.reload();
      this.getDiaryID()
      this.getUserFavDetailID()
      refresher.complete();
    }, 500);
  }


}

