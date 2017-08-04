import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TropicsComponent } from './tropics.component';

describe('TropicsComponent', () => {
  let component: TropicsComponent;
  let fixture: ComponentFixture<TropicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TropicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TropicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
