import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BotResponseComponent} from './bot-response.component';
import {DebugElement} from "@angular/core";
import {MarkdownModule} from "ngx-markdown";
import {HttpClient} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";

describe('BotResponseComponent', () => {
  let component: BotResponseComponent;
  let fixture: ComponentFixture<BotResponseComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotResponseComponent],
      imports: [
        HttpClientTestingModule,
        MarkdownModule.forRoot({loader: HttpClient}),
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotResponseComponent);
    component = fixture.componentInstance;
    component.message = {
      identifier: '00000000-0000-0000-0000-000000000000',
      text: 'testMessage',
      payload: 'testPayload',
      imageUrl:'',
      buttons: [] };
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an enum that contains the possible message types', () => {
    expect(component.BOT_RESPONSE_TYPE_ENUM).toBeTruthy();

    expect(component.BOT_RESPONSE_TYPE_ENUM.IMAGE).toBe("image");
    expect(component.BOT_RESPONSE_TYPE_ENUM.TEXT).toBe("text");
    expect(component.BOT_RESPONSE_TYPE_ENUM.BUTTONS).toBe("buttons");
    expect(component.BOT_RESPONSE_TYPE_ENUM.BUTTONS_AND_TEXT).toBe("buttons_and_text");
  });

  it('should correctly determine the message type', () => {
    expect(component.determineType({
      identifier: '00000000-0000-0000-0000-000000000000',
      text: 'TestText',
      payload: '',
      imageUrl: '',
      buttons: []}))
      .toBe('text');
    expect(component.determineType({
      identifier: '00000000-0000-0000-0000-000000000000',
      text: 'TestText',
      payload: '',
      imageUrl: '',
      buttons: [{'payload':'TestButtonPayload', 'title':'TestButtonTitle'}]})).toBe('buttons_and_text');
    expect(component.determineType({
      identifier: '00000000-0000-0000-0000-000000000000',
      text: '',
      payload: '',
      imageUrl: 'https://test.com/test.png',
      buttons: []})).toBe('image');
    expect(component.determineType({
      identifier: '00000000-0000-0000-0000-000000000000',
      text: '',
      payload: '',
      imageUrl: '',
      buttons: [{'payload':'TestButtonPayload', 'title':'TestButtonTitle'}]})).toBe('buttons');

  });
});
