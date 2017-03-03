import { AddDiaryPage } from './addDiary';
import { Component, NgZone } from '@angular/core';
//import { AddPage } from './add/add';
import { NavController, ViewController, NavParams } from 'ionic-angular';
//import { Camera } from 'ionic-native';


type Country = {
  id: string,
  name: string
}

@Component({
  selector: 'page-addCountry',
  templateUrl: 'addCountry.html'
})

export class AddCountryPage {
  countrys: Country[] = [];
  // public base64Image: string;
  //items: Country[] = [];
  parent: AddDiaryPage
  country_id: string;
  constructor(private navCtrl: NavController, private zone: NgZone, public viewCtrl: ViewController, public navParams: NavParams) {
    //this.ContinentItems() ;
    // this.items = this.getCountryList();
    //this.ContinentItems();
    this.parent = navParams.get('parent')
  }

  ionViewDidLoad() {

    setTimeout(() => {
      this.getCountryList()
    }, 200);

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
  //     this.navCtrl.push(AddPage);
  //     return 'data:image/jpeg;base64,' + imageData;


  // }

  // // 失敗時
  // cameraErrorCallback(message) {
  //     alert('Loading image failed due to: ' + message);
  // }

  // ContinentItems() {
  //   this.items.push({id: '1',name: 'go'});
  //    this.items.push({id: '2',name: 'php'}); 
  //   }


  getItems(event) {

    this.countrys;
    var val = event.target.value;
    //if (val && val.trim() != '') {
    //前後空白を消して、空ではない
    if (val.trim() != '') {
      //各要素に対して、指定した条件を満たす要素だけを含む配列を返す
      this.countrys = this.countrys.filter((item) => {

        //要素が部分一致しているかどうか(英字を想定し
        //全部小文字に変換後検索かける)
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        // return item.name.indexOf(val) > -1;
      });
    }
  }


  データベース
  getCountryList() {

    let request = new WLResourceRequest('/adapters/sqlAdapter/getCountryList', WLResourceRequest.GET);
    //  request.setQueryParameter('params', '[1]');
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
            });

            // alert(JSON.stringify(response));

          }

          this.zone.run(() => {
            this.countrys = results;
            //return results;
          });
          //  console.log(JSON.stringify(response));

        } else {

        }
        // alert(JSON.stringify(response));

      },
      // 失敗時
      (error) => {
        // alert(JSON.stringify(error));
      }
    );



  }

  choiceCountryID(item) {
    this.parent.country_id = item.id;
    this.parent.country_name = item.name;
  }


  // addCountryID() {
  //     //alert(this.country_id);
  //     this.viewCtrl.dismiss(data => (this.country_id));
  //   }

}