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
      declarations: [ UserMessageComponent, TestHostComponent ]
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

  it('should render the message',  () => {
    expect(testHostDe.query(By.css('p')).nativeElement.textContent.replace(/[^a-z0-9]/gmi, ""))
      .toBe('TestString'); // Find out why there are weird spaces in queried String
  });
});

@Component({
  selector: 'test-host-component',
  template: '<app-user-message [userMessage]="this.testUserMessage"></app-user-message>'
})
class TestHostComponent {
  public testUserMessage = {"identifier":"d0db5fae-e24c-452c-943a-aa87cb2731e7", "content":"TestString"};
  @ViewChild(UserMessageComponent) userMessageComponent: UserMessageComponent;
}
