import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InputAreaComponent} from './input-area.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MessageService} from "../message.service";
import {UserService} from "../../shared/services/user.service";
import {FormsModule, NgForm} from "@angular/forms";
import {MaterialModule} from "../../modules/material/material.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('InputAreaComponent', () => {
    let component: InputAreaComponent;
    let fixture: ComponentFixture<InputAreaComponent>;
    let de: DebugElement;

    let mockMessageService: MessageService;

    beforeEach(async () => {
        mockMessageService =
            jasmine.createSpyObj<MessageService>('MessageService', ['sendMessage']);
        await TestBed.configureTestingModule({
            declarations: [InputAreaComponent],
            providers: [
                {provide: MessageService, useValue: mockMessageService}, UserService],
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                FormsModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputAreaComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the mat-form-field', () => {
        expect(de.query(By.css('mat-form-field'))).toBeTruthy();
    });

    it('should call the onSubmit Method when submit button is clicked', () => {
        spyOn(component, 'onSubmit');
        const button = de.query(By.css('button')).nativeElement;
        button.click();
        expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should reset the form when the submit button is clicked', waitForAsync(() => {
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

    it('should  not call sendMessage() when submit button is pressed and input field is empty',
        waitForAsync(() => {
            const form: NgForm = <NgForm>{
                value: {
                    message: ''
                },
                reset(value?: any) {
                    this.value.message = '';
                }
            }
            component.onSubmit(form);
            expect(mockMessageService.sendMessage).not.toHaveBeenCalled();
        })
    );

    it('should call sendMessage() when submit button is pressed and input field is not empty',
        waitForAsync(() => {
            const form: NgForm = <NgForm>{
                value: {
                    message: 'InputAreaComponentTest'
                },
                reset(value?: any) {
                    this.value.message = '';
                }
            }
            component.onSubmit(form);
            expect(mockMessageService.sendMessage).toHaveBeenCalled();
        })
    );
});
