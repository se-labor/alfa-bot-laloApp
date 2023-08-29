import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './shared/header/header.component';
import {TextAreaComponent} from './chat/text-area/text-area.component';
import {BotResponseComponent} from './chat/text-area/bot-response/bot-response.component';
import {UserMessageComponent} from './chat/text-area/user-message/user-message.component';
import {InputAreaComponent} from './chat/input-area/input-area.component';
import {ApiModule, BotService, Configuration} from "./modules/api";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./modules/material/material.module";
import {FormsModule} from "@angular/forms";
import {MarkdownModule, MarkedOptions, MarkedRenderer} from "ngx-markdown";
import {ImageLoadedDirective} from './chat/text-area/bot-response/image-loaded.directive';
import {MenuComponent} from './menu/menu.component';
import {ChatComponent} from './chat/chat.component';
import {MenuHeaderComponent} from "./menu/menu-header/menu-header.component";
import {SettingsComponent} from './menu/sub-menus/settings/settings.component';
import {InfoComponent} from './menu/sub-menus/info/info.component';
import {CarouselComponent} from './menu/carousel/carousel.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

export function apiConfigFactory(): Configuration {

  return new Configuration({
    // Left undefined to use default Path defined in BotService
    basePath: '',
    credentials: {
      Authorization: ''
    },
  });
}

export function botServiceFactory(httpClient: HttpClient, basePath: string): BotService {
  return new BotService(httpClient, basePath, apiConfigFactory());
}

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
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
    CarouselComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    ApiModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    }),
    NgbModule
  ],
  providers: [
    {
      provide: BotService,
      useFactory: botServiceFactory,
      deps: [HttpClient]
    },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
