import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {TextAreaComponent} from './text-area/text-area.component';
import {BotMessageComponent} from './text-area/bot-message/bot-message.component';
import {UserMessageComponent} from './text-area/user-message/user-message.component';
import {InputAreaComponent} from './input-area/input-area.component';
import {ApiModule, BotService, Configuration} from "./api";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material/material.module";
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";

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
    BotMessageComponent,
    UserMessageComponent,
    InputAreaComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
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
