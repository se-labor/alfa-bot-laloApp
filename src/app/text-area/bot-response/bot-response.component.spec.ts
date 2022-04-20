import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BotResponseComponent} from './bot-response.component';

describe('BotMessageComponent', () => {
  let component: BotResponseComponent;
  let fixture: ComponentFixture<BotResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
