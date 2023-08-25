import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Component, DebugElement, ViewChild} from "@angular/core";
import {By} from "@angular/platform-browser";
import {UserMessageComponent} from "./user-message.component";

describe('UserMessageComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let testHostDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMessageComponent, TestHostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostDe = testHostFixture.debugElement;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should render the message', () => {
    expect(testHostDe.query(By.css('p'))
      .nativeElement.textContent.replace(/[^a-zA-Z]/g, "")) // Remove all non-alphabetic characters
      .toBe('testMessage');
  });
});

@Component({
  selector: 'app-test-host-component',
  template: '<app-user-message [message]="this.testUserMessage"></app-user-message>'
})
class TestHostComponent {
  public testUserMessage = {
    identifier: '00000000-0000-0000-0000-000000000000',
    text: 'testMessage',
    payload: 'testPayload',
    imageUrl: '',
    buttons: []
  };
  @ViewChild(UserMessageComponent) userMessageComponent: UserMessageComponent;
}
