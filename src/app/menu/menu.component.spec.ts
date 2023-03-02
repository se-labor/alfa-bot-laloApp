import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenueComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should swap active chat bot', () => {
    component.chatBots = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}];
    component.activeChatBot = component.chatBots[0];
    component.swapActiveChatBot(true);
    expect(component.activeChatBot).toEqual(component.chatBots[1]);
    component.swapActiveChatBot(false);
    expect(component.activeChatBot).toEqual(component.chatBots[0]);
  });

  it('should set active chat bot if undefined', () => {
    component.chatBots = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'}];
    component.activeChatBot = undefined;
    component.swapActiveChatBot(true);
    expect(component.activeChatBot).toEqual(component.chatBots[0]);
  });
});
