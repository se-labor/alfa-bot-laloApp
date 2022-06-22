import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputAreaComponent} from './input-area.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MessageService} from "../shared/services/message.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {UserService} from "../shared/services/user.service";
import {FormsModule} from "@angular/forms";

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
      providers: [ MessageService, UserService, HttpClient, HttpHandler],
      imports: [FormsModule]
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

  it('should call the onSubmit Method', () => {
    spyOn(component, 'onSubmit');
    const button = de.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  xit('should reset the form after the onSubmit Method is called', () => {
    const input = de.query(By.css('input'));
    input.nativeElement.ngContent = 'text';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
   /* const button = de.query(By.css('button')).nativeElement;
    button.click();*/
    const form = de.query(By.css('form')).nativeElement
    form.submit();
    fixture.detectChanges();
    expect(input.nativeElement.value).toBeFalsy();
  });

  it('should be invalid while empty', () => {
    const input = de.query(By.css('input'));
    fixture.detectChanges();
    expect(input.nativeElement.valid).toBeFalsy();
  })

  it('should be valid with while not empty', () => {
    const input = de.query(By.css('input'));
    input.nativeElement.textContent = 'TestString'
    fixture.detectChanges();
    expect(input).toBeTruthy();
  })

});
