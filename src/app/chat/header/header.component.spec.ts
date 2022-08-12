import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MaterialModule} from "../../modules/material/material.module";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [MaterialModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-toolbar', () => {
    expect(de.query(By.css('mat-toolbar')).nativeElement).toBeTruthy();
  });

  it('should have a div containing the title', () => {
    expect(de.query(By.css('div')).nativeElement.innerText).toBe(component.title);
  });
});
