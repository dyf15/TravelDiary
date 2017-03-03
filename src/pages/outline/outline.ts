import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-outline',
  templateUrl: 'outline.html'
})
export class OutlinePage {
  constructor(private navCtrl: NavController, public viewCtrl: ViewController) {
  }

  listItemOnClick() {
    alert('click!')
  }
  close() {
    this.viewCtrl.dismiss();
  }
}

