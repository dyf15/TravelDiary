import { AddDetailPage } from './../pages/add/addDetail';
import { AddDiaryPage } from './../pages/add/addDiary';
import { AddTagPage } from './../pages/add/addTag';
import { SearchPage } from './../pages/search/search';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatPage } from '../pages/chat/chat';
import { GourmetPage } from '../pages/gourmet/gourmet';
import { AddPage } from '../pages/add/add';
import { AddCountryPage } from './../pages/add/addCountry';
import { MyPage } from '../pages/mypage/mypage';
import { InfoPage } from '../pages/info/info';
import { DiaryDetailPage } from '../pages/diaryDetail/diaryDetail';
import { PopoverPage } from '../pages/diaryDetail/popover';
import { OutlinePage } from '../pages/outline/outline';
import { RootPage } from '../pages/root/root';
import { OrderBy } from './../pipes/order-by';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GourmetPage,
    AddPage,
    MyPage,
    InfoPage,
    ChatPage,
    SearchPage,
    DiaryDetailPage,
    PopoverPage,
    AddCountryPage,
    OutlinePage,
    RootPage,
    AddDiaryPage,
    AddTagPage,
    AddDetailPage,
    OrderBy
  ],
  imports: [
    //IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages:true},{})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GourmetPage,
    AddPage,
    MyPage,
    InfoPage,
    ChatPage,
    SearchPage,
    DiaryDetailPage,
    PopoverPage,
    AddCountryPage,
    OutlinePage,
    RootPage,
    AddDiaryPage,  
    AddTagPage,
    AddDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
