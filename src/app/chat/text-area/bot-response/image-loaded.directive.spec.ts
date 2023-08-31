
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImageLoadedDirective } from './image-loaded.directive';

@Component({
  template: '<img (loaded)="onImageLoad()" appLoadedEmitter [src]="imageUrl" alt="">',
})
class TestComponent {
  imageUrl = 'https://picsum.photos/200';
  onImageLoad = jasmine.createSpy('onImageLoad');
}

describe('ImageLoadedDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, ImageLoadedDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit loaded event when image is loaded', () => {
    const img = fixture.nativeElement.querySelector('img');
    img.dispatchEvent(new Event('loaded'));
    expect(component.onImageLoad).toHaveBeenCalled();
  });
});
