import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BotResponseComponent} from './bot-response.component';
import {DebugElement} from "@angular/core";
import {MarkdownModule} from "ngx-markdown";
import {HttpClient} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";

describe('BotMessageComponent', () => {
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
      'message':'TestText',
      'imageUrl':'',
      'buttons':[]})).toBe('text');
    expect(component.determineType({
      'message':'TestText',
      'imageUrl':'',
      'buttons':[{'payload':'TestButtonPayload', 'title':'TestButtonTitle'}]})).toBe('buttons_and_text');
    expect(component.determineType({
      'message':'',
      'imageUrl':'https://testImageUrl.de/loremipsum',
      'buttons':[]})).toBe('image');
    expect(component.determineType({
      'message':'',
      'imageUrl':'',
      'buttons':[{'payload':'TestButtonPayload', 'title':'TestButtonTitle'}]})).toBe('buttons');

  });
});