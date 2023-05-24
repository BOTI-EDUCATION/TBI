import { NgModule, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';

import { MomentModule } from 'angular2-moment';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';

import { FormBuilder } from '@angular/forms';

// FCM
import { FCM } from '@ionic-native/fcm/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CountdownModule, CountdownComponent, CountdownGlobalConfig, CountdownTimer } from 'ngx-countdown';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    NgxYoutubePlayerModule.forRoot(),
    CountdownModule,

    BrowserAnimationsModule,
    IonicModule.forRoot(),
    MomentModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    SplashScreen,
    Camera,
    Facebook,
    GooglePlus,
    SignInWithApple,
    File,
    FilePath,
    FileChooser,
    IOSFilePicker,
    Base64,
    FormBuilder,
    Downloader,
    CountdownComponent,
    AppVersion,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
