import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {TextAreaComponent} from "./text-area/text-area.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {InputAreaComponent} from "./input-area/input-area.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgForm} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        TextAreaComponent,
        InputAreaComponent,
        NgForm
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
