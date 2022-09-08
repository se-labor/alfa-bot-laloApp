import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './chat/header/header.component';
import {TextAreaComponent} from './chat/text-area/text-area.component';
import {BotResponseComponent} from './chat/text-area/bot-response/bot-response.component';
import {UserMessageComponent} from './chat/text-area/user-message/user-message.component';
import {InputAreaComponent} from './chat/input-area/input-area.component';
import {ApiModule, BotService, Configuration} from "./modules/api";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./modules/material/material.module";
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {MarkdownModule} from "ngx-markdown";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ImageLoadedDirective} from './chat/text-area/bot-response/image-loaded.directive';
import {MenuComponent} from './menu/menu.component';
import {ChatComponent} from './chat/chat.component';
import {MenuHeaderComponent} from "./menu/menu-header/menu-header.component";
import { SettingsComponent } from './menu/sub-menus/settings/settings.component';
import { InfoComponent } from './menu/sub-menus/info/info.component';

export function apiConfigFactory(): Configuration {

  if (window['env'] !== undefined && window['env']['BOT_CONFIG'] !== undefined ) {
    window['env']['BOT_CONFIG'].find(botConfig => botConfig.id == 'wahlenNrw2022').apiKey = environment.apiKey;
  }

  return new Configuration({
    // Left undefined to use default Path defined in BotService
    basePath: '',
    credentials: {
      Authorization: ''
    },
  });
}

export function botServiceFactory(httpClient: HttpClient, basePath: string): BotService {
  return new BotService(httpClient,basePath, apiConfigFactory());
}

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HeaderComponent,
    TextAreaComponent,
    BotResponseComponent,
    UserMessageComponent,
    InputAreaComponent,
    ImageLoadedDirective,
    MenuComponent,
    MenuHeaderComponent,
    SettingsComponent,
    InfoComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    FlexLayoutModule
  ],
  providers: [
    {
      provide: BotService,
      useFactory: botServiceFactory,
      deps: [HttpClient]
    },],
  bootstrap: [AppComponent]
})
export class AppModule {}
