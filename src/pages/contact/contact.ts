import {Component} from '@angular/core';
import {App, MenuController} from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(app: App, menu: MenuController) {
    menu.enable(true);
  }

}
