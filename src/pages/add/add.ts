import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, File } from 'ionic-native';
import { AddDiaryPage } from './addDiary';

// type Photo = {
//   imagePath: string
//   exif: string
// }

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  //items: Photo[] = []
  base64Image: string
  imagePath: string
  exif: string
  constructor(public navCtrl: NavController, public zone: NgZone) {
  }

  // PhotoLibraryから画像を選択（FilePathのみ）
  selectPicture() {
    let options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    }
    Camera.getPicture(options).then((res) => {
      // 選択された画像のファイルパスとEXIF情報を取得
      this.zone.run(() => {
        let info = JSON.parse(res)

        this.imagePath = info.filename
        this.exif = info.json_metadata
        // this.items.push({
        //   imagePath: info.filename,
        //   exif: info.json_metadata
        // })

        this.navCtrl.push(AddDiaryPage, { imagePath: this.imagePath, exif: this.exif });
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
    }, (err) => {
      // alert(err)
    })
  }

  // // 読み込んだ画像の削除
  // removePicture() {
  //   this.base64Image = null
  // }


  addDiaryImg() {
    // this.selectPicture();
    // this.readPicture(this.imagePath);

    this.navCtrl.push(AddDiaryPage);
  }
}



//   import { AddDiaryPage } from './addDiary';
// import { Component, NgZone } from '@angular/core';
// import { NavController, AlertController, ModalController } from 'ionic-angular';
// import { Camera, File} from 'ionic-native';


// type Photo = {
//   imagePath: string
//   exif: string
// }

// @Component({
//   selector: 'page-add',
//   templateUrl: 'add.html'
// })
// export class AddPage {
//   items: Photo[];
//   public base64Image: string;
//   constructor(private navCtrl: NavController, private zone: NgZone, private alertCtrl: AlertController, public modalCtrl: ModalController) {

//   }

//   //PhotoLibraryから画像を選択（FilePathのみ）
//   selectPicture() {
//     let options = {
//       sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//     }
//     Camera.getPicture(options).then((res) => {
//       // 選択された画像のファイルパスとEXIF情報を取得
//       this.zone.run(() => {
//         let info = JSON.parse(res)
//         this.items.push({
//           imagePath: info.filename,
//           exif: info.json_metadata
//         })
//       })
//       alert(res)
//     }, (err) => {
//       alert(err)
//     })
//   }

//   FilePathから画像を読み込む
//   readPicture(imagePath: string) {
//       // ファイルパスから画像本体をbase64として取得
//       const name = imagePath.split('/').pop();
//       const path = imagePath.replace(name, '');
//       File.readAsDataURL(path, name).then((base64Image: string) => {
//         this.base64Image = base64Image
//         this.navCtrl.push(AddDiaryPage,this.base64Image);
//       }, (err) => {
//         alert(err)
//       })
//   }


//   addDiaryImg() {
//     alert('ok')
// //    this.navCtrl.push(AddDiaryPage);
//   }
// }
//}
