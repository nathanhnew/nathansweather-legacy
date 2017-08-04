import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurWidgetComponent } from './cur-widget.component';

describe('CurWidgetComponent', () => {
  let component: CurWidgetComponent;
  let fixture: ComponentFixture<CurWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
