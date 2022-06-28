import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextAreaComponent} from './text-area.component';
import {MessageService} from "../shared/services/message.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ImageService} from "./services/image.service";

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
      providers: [MessageService, ImageService, HttpClient, HttpHandler]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly determine the message type', () => {
    expect(component.determineMessageType({
      'message': '',
      'imageUrl': '',
      'buttons': [{'payload': 'TestButtonPayload', 'title': 'TestButtonTitle'}]
    })).toBe('bot');
    expect(component.determineMessageType({
      'identifier': '',
      'content': ''
    })).toBe('user');
  });

  it('should call "scrollToBottom()" after view is checked', () => {
    spyOn(component, 'scrollToBottom').and.callThrough();
    fixture.detectChanges();
    expect(component.scrollToBottom).toHaveBeenCalled();
  });
});
