import { AddTagPage } from './addTag';
import { AddDetailPage } from './addDetail';
import { AddPage } from './add';

/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />

import { AddCountryPage } from './addCountry';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Camera, File } from 'ionic-native';

// type newDiary = {

//   title: string,
//   //空は可能
//   comment: string,

//   //空は可能
//   tag_id: string,

//   photo: string,

//  //旅行地
//   country_id: string,

//   spot: string,
//   //日記全体に対するコメント
//   introduction: string


// }

@Component({
  selector: 'page-addDiary',
  templateUrl: 'addDiary.html'
})
export class AddDiaryPage {
  private disabled_btn: boolean = false;

  user_id: string = '6'
  title: string = '';
  comment: string = '';
  tag_id: string;
  tag_name: string = 'メインタグ(表紙に表示)';
  country_id: string;
  country_name: string = '国';
  spot: string = '';
  introduction: string = '';
  base64Image: string;
  imagePath: string;
  exif: string;
  diary_id: string;

  photo_info: any;
  constructor(private navCtrl: NavController, private navParams: NavParams, private zone: NgZone, private alertCtrl: AlertController, public modalCtrl: ModalController) {
    //this.selectPicture();
    // this.country_id = modalCtrl.get('country_id');
    this.imagePath = navParams.get('imagePath');
    // alert(this.imagePath)
    this.readPicture(this.imagePath);

    // alert(this.country_id)
    //  alert('addDiarybase 0: ' + this.base64Image);
  }

  // ionViewDidLoad() {
  //   //SET TIME OUT !!!必ず書く
  //   setTimeout(() => {
  //     this.selectPicture()
  //   }, 200);

  // }



  // PhotoLibraryから画像を選択（FilePathのみ）
  selectPicture() {
    let options = {
      quality: 20,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    }
    Camera.getPicture(options).then((res) => {
      // 選択された画像のファイルパスとEXIF情報を取得
      this.zone.run(() => {
        let info = JSON.parse(res)
        // this.items.push({
        //   imagePath: info.filename,
        //   exif: info.json_metadata
        // })
        this.imagePath = info.filename
        this.exif = info.json_metadata
        this.readPicture(this.imagePath)
        // alert('1 : ' + this.base64Image)
      })

    }, (err) => {
      // alert(err)
    })
  }

  // FilePathから画像を読み込む
  readPicture(imagePath: string) {
    // ファイルパスから画像本体をbase64として取得
    const name = imagePath.split('/').pop();
    const path = imagePath.replace(name, '');
    File.readAsDataURL(path, name).then((base64Image: string) => {
      this.base64Image = base64Image
      // alert(JSON.stringify(base64Image))
    }, (err) => {
      // alert(err)
    })
  }

  // // 読み込んだ画像の削除
  // removePicture() {
  //   this.base64Image = null
  // }






  // データベース
  addNewDiary() {


    //this.disabled_btn = false
    //alert(this.base64Image)
    let item = {
      user_id: this.user_id,
      diary_id: this.diary_id,
      title: this.title,
      comment: this.comment,
      tag_id: this.tag_id == undefined ? null : this.tag_id,
      photo: this.base64Image,
      introduction: this.introduction,
      country_id: this.country_id == undefined ? null : this.country_id,
      spot: this.spot
    };
    let request = new WLResourceRequest('/adapters/sqlAdapter/addNewDiary', WLResourceRequest.POST);

    request.setQueryParameter('params', '["' + item.user_id + '","' + item.diary_id + '","' + btoa(encodeURIComponent(item.title)) + '","' + btoa(encodeURIComponent(item.comment)) + '",' + item.tag_id + ',"' + item.photo + '","' + btoa(encodeURIComponent(item.introduction)) + '",' + item.country_id + ',"' + btoa(encodeURIComponent(item.spot)) + '"]');
    //     // request.setQueryParameter('params', );
    //    //alert('data : ' + '["' + item.user_id + '","' + item.diary_id + '","' + item.title + '","' + item.comment + '","' + item.tag_id + '","' + item.introduction + '","' + item.country_id + '","' + item.spot + '"]');
    request.send().then(
      // 成功時
      (response) => {

        // alert('登録成功しました');
        this.showAddDiaryDetail();
        // }
      },
      // 失敗時
      (error) => {
        this.disabled_btn = false;
        //alert('PROCEDURE ERROR : ' + '["' + item.diary_id + '","' + item.title + '","' + item.comment + '","' + item.tag_id + '","' + item.country_id + '","' + item.spot + '","' + item.introduction + '"]');
        // alert('登録エラーです　：　　' + JSON.stringify(error));
        //  alert('登録失敗しました');
      }
    );


    //    var flag = 0;
    //   this.readPicture(this.photo_info.imagePath)
    //  this.getMaxDiaryID()



  }


  getCountryList() {

    // let modal = this.modalCtrl.create(AddCountryPage);
    // modal.present();
    this.navCtrl.push(AddCountryPage, { parent: this });
  }

  getTagList() {
    this.navCtrl.push(AddTagPage, { tag: this });
  }

  //写真を選択
  // chooseImage() {
  //     var option = {
  //         sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //         quality: 20,
  //         destinationType: Camera.DestinationType.DATA_URL,
  //         encodingType: Camera.EncodingType.JPEG
  //     };

  //     Camera.getPicture(option).then((imageData) => {
  //         this.cameraSuccessCallback(imageData);
  //         this.base64Image = this.cameraSuccessCallback(imageData); 
  //     }, (error) => {
  //         this.cameraErrorCallback(error);
  //     });

  // }

  // // 成功時
  // cameraSuccessCallback(imageData) {
  //     console.log('Getting image data as base64 string from camera/Gallery success.');
  //     console.log(imageData);
  //     return 'data:image/jpeg;base64,' + imageData;
  // }

  // // 失敗時
  // cameraErrorCallback(message) {
  //     alert('Loading image failed due to: ' + message);
  // }





  //旅行日記削除確認アラート
  DelConfirmAlert() {
    let alert = this.alertCtrl.create({
      title: '確認',
      message: 'この旅行日記を削除しますか?',
      buttons: [
        {
          text: 'いいえ',
          handler: () => {
            //何もしない
            console.log('いいえ clicked');
          }
        },
        {
          text: 'はい',
          handler: () => {
            //写真アップページに戻る
            console.log('はい clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  // plus() {

  // } 



  //  // データベース
  //   addNewDiary(event: any) {


  //   let item: newDiary = {
  // title: 'test',
  //     comment: 'string',
  //     tag_id: '1',
  //     photo: 'string',
  //     introduction: 'string',
  //     country_id: '1',
  //     spot: 'sa'


  //   };

  //     let request = new WLResourceRequest('/adapters/sqlAdapter/addNewDiary', WLResourceRequest.POST);
  //     request.setQueryParameter('params', '["' + item.title + '","' + item.comment + '","' + item.tag_id + '","' + item.photo + '","' + item.country_id + '","' + item.spot + '","' + item.introduction + '"]');
  //    // request.setQueryParameter('params', );
  //     request.send().then(
  //       // 成功時
  //       (response) => {

  //           alert('登録成功しました');

  //        // }
  //       },
  //       // 失敗時
  //       (error) => {
  //           alert('PROCEDURE ERROR : ' + item.title);
  //         alert(JSON.stringify(error));
  //       }
  //     );
  //   }


  //   openCountryListPage() {
  //        this.navCtrl.push(AddCountryPage);
  //   }



  //今登録されている日記のId最大値　＋　１
  getMaxDiaryID() {

    if (this.disabled_btn == true) {
      return;
    }
    else {

      let request = new WLResourceRequest('/adapters/sqlAdapter/getMaxDiaryID', WLResourceRequest.GET);
      //  request.setQueryParameter('params', '[1]');
      let max_diary_id: string;
      request.send().then(
        // 成功時
        (response) => {
          let result = response.responseJSON;

          if (result.isSuccessful) {
            //   let results = [];

            for (let i = 0; i < result.resultSet.length; i++) {
              let rs = result.resultSet[i];
              max_diary_id = rs.max_diary_id
              // alert(JSON.stringify(response));

            }

            this.zone.run(() => {
              // alert('max' + max_diary_id)
              //  alert('max + 1: ' +　(parseInt(max_diary_id) + 1));
              this.diary_id = String((parseInt(max_diary_id) + 1));
              // alert('max_diary_id   : ' + max_diary_id);
              //alert('diary_id  : ' + this.diary_id);
              //return results;
            });
            //  console.log(JSON.stringify(response));

          } else {

          }
          this.addNewDiary();
          // alert(JSON.stringify(response));

        },
        // 失敗時
        (error) => {
          // alert('getMaxDiaryIDエラー : ' + JSON.stringify(error));
        }
      );
    }
    this.disabled_btn = true
  }


  showAddDiaryDetail() {

    let alert = this.alertCtrl.create({
      title: '日記表紙登録できました',
      message: '日記表紙登録できました。今から日記を追加しますか？',
      buttons: [
        {
          text: '後で',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
            console.log('Cancel clicked');

          }
        },
        {
          text: '追加',
          handler: () => {

            this.navCtrl.push(AddDetailPage, this.diary_id);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();

  }

  show() {
    alert(this.country_id)
  }


}

