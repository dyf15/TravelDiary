import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, File } from 'ionic-native';

type DiaryDetail = {
  tag_id: string,
  photo: string,
  latitude: string,
  longitude: string,
  spot: string,
  comment: string,

}

@Component({
  selector: 'page-addDetail',
  templateUrl: 'addDetail.html'
})
export class AddDetailPage {
  diary_id: string;
  details: DiaryDetail[] = []
  imagePath: string;
  imagebase64: string;
  exif: string;

  myDate = '';
  constructor(public navCtrl: NavController, public zone: NgZone) {
    this.selectPicture();
  }

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
        this.imagePath = info.filename,
          this.exif = info.json_metadata
      })
      alert(this.exif);
    }, (err) => {
      alert(err)
    })
  }
}
