
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { GourmetPage } from '../gourmet/gourmet';
import { AddPage } from '../add/add';
import { MyPage } from '../mypage/mypage';
import { InfoPage } from '../info/info';
import { ModalController } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = GourmetPage;
  tab3Root: any = AddPage;
  //tab3Root: any = AddModalPage;
  tab4Root: any = InfoPage;
  tab5Root: any = MyPage;
  constructor(public modalCtrl: ModalController) {

  }


}
