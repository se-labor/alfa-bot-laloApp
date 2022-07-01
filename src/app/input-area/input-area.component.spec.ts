import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InputAreaComponent} from './input-area.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MessageService} from "../shared/services/message.service";
import {UserService} from "../shared/services/user.service";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../modules/material/material.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('InputAreaComponent', () => {
  let component: InputAreaComponent;
  let fixture: ComponentFixture<InputAreaComponent>;
  let de: DebugElement;

  let mockMessageService: MessageService;
  let mockUserService: UserService;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAreaComponent ],
      providers: [ MessageService, UserService],
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

    mockMessageService = TestBed.inject(MessageService);
    spy = spyOn(mockMessageService, 'sendMessage').and.returnValue();

    mockUserService = TestBed.inject(UserService)
    spyOn(mockUserService, 'getUUID').and.returnValue('28f7cd1c-8a1f-4be4-8a8b-5bc38f0d7ac7');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the mat-label', () => {
    expect(de.query(By.css('mat-label'))).toBeTruthy();
  });

  it('should call the onSubmit Method', () => {
    spyOn(component, 'onSubmit');
    const button = de.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should reset the form after the onSubmit Method is called', waitForAsync(() => {
    const input = de.query(By.css('input'));
    input.nativeElement.value = 'text';
    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(input.nativeElement.value).toBe('');
    });
  }));

  it('should be invalid while empty', () => {
    const input = de.query(By.css('input'));
    fixture.detectChanges();
    expect(input.nativeElement.valid).toBeFalsy();
  });

  it('should be valid while not empty', () => {
    const input = de.query(By.css('input'));
    input.nativeElement.textContent = 'TestString'
    fixture.detectChanges();
    expect(input).toBeTruthy();
  });

});
