import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SevereComponent } from './severe.component';

describe('SevereComponent', () => {
  let component: SevereComponent;
  let fixture: ComponentFixture<SevereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SevereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
