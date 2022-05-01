import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageViewComponent } from './percentage-view.component';

describe('PercentageViewComponent', () => {
  let component: PercentageViewComponent;
  let fixture: ComponentFixture<PercentageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
