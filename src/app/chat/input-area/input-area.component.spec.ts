import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InputAreaComponent} from './input-area.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MessageService} from "../message.service";
import {UserService} from "../../shared/services/user.service";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../modules/material/material.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('InputAreaComponent', () => {
  let component: InputAreaComponent;
  let fixture: ComponentFixture<InputAreaComponent>;
  let de: DebugElement;

  let mockMessageService: MessageService;
  let mockUserService: UserService;

  beforeEach(async () => {
    mockMessageService = jasmine.createSpyObj<MessageService>('MessageService', ['sendMessage']);
    await TestBed.configureTestingModule({
      declarations: [InputAreaComponent],
      providers: [
        {provide: MessageService, useValue: mockMessageService},
        {provide: UserService, useValue: mockUserService}],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAreaComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    mockUserService = TestBed.inject(UserService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the mat-form-field', () => {
    expect(de.query(By.css('mat-form-field'))).toBeTruthy();
  });

  it('should call the onSubmit Method', () => {
    spyOn(component, 'onSubmit');
    const button = de.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should reset the form after the onSubmit Method is called', waitForAsync(() => {
    const input = de.query(By.css('input'));
    input.nativeElement.value = 'InputAreaComponentTest';
    fixture.detectChanges();
    const button = de.query(By.css('button')).nativeElement;
    button.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(input.nativeElement.value).toBe('');
    });
  }));

  it('should not call sendMessage() while empty', waitForAsync(() => {
    const input = de.query(By.css('input'));
    input.nativeElement.value = 'InputAreaComponentTest';
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit',);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockMessageService.sendMessage).not.toHaveBeenCalled();
    });
  }));

  it('should call sendMessage() when send button is pressed and input field is not empty', () => {
    const input = de.query(By.css('input')).nativeElement;
    input.value = 'test message';
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit');
    expect(mockMessageService.sendMessage).toHaveBeenCalled();
  });
});

