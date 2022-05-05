import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {TextAreaComponent} from './text-area/text-area.component';
import {BotResponseComponent} from './text-area/bot-response/bot-response.component';
import {UserMessageComponent} from './text-area/user-message/user-message.component';
import {InputAreaComponent} from './input-area/input-area.component';
import {ApiModule, BotService, Configuration} from "./modules/api";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./modules/material/material.module";
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {MarkdownModule} from "ngx-markdown";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ImageLoadedDirective} from './text-area/bot-response/image-loaded.directive';

export function apiConfigFactory(): Configuration {
  return new Configuration({
    // Left undefined to use default Path defined in BotService
    basePath: environment.apiUrl,
    credentials: {
      Authorization: environment.apiKey
    },
  });
}

export function botServiceFactory(httpClient: HttpClient, basePath: string): BotService {
  return new BotService(httpClient,basePath, apiConfigFactory());
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextAreaComponent,
    BotResponseComponent,
    UserMessageComponent,
    InputAreaComponent,
    ImageLoadedDirective
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
export class AppModule { }
