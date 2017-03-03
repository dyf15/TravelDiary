import { AddDiaryPage } from './addDiary';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


type Tag = {
  id: string,
  name: string
}
@Component({
  selector: 'page-addTag',
  templateUrl: 'addTag.html'
})
export class AddTagPage {
  tag: AddDiaryPage
  tags: Tag[] = []
  constructor(private navCtrl: NavController, private zone: NgZone, public navParams: NavParams) {

    this.tag = navParams.get('tag')
  }

  ionViewDidLoad() {

    setTimeout(() => {
      this.getTagList()
    }, 200);

  }

  //データベース
  getTagList() {

    let request = new WLResourceRequest('/adapters/sqlAdapter/getTagList', WLResourceRequest.GET);
    //  request.setQueryParameter('params', '[1]');
    request.send().then(
      // 成功時
      (response) => {
        let result = response.responseJSON;

        if (result.isSuccessful) {
          let results: Tag[] = [];

          for (let i = 0; i < result.resultSet.length; i++) {
            let rs = result.resultSet[i];
            results.push({
              id: rs.tag_id,
              name: rs.tag_name
            });

            // alert(JSON.stringify(response));

          }

          this.zone.run(() => {
            this.tags = results;
            //return results;
          });
          //  console.log(JSON.stringify(response));

        } else {

        }
        //alert(JSON.stringify(response));

      },
      // 失敗時
      (error) => {
        // alert(JSON.stringify(error));
      }
    );
  }

  choiceTagID(item) {
    this.tag.tag_id = item.id;
    this.tag.tag_name = item.name;
  }

}