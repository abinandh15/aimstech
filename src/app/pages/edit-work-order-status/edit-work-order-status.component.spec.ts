import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkOrderStatusComponent } from './edit-work-order-status.component';

describe('EditWorkOrderStatusComponent', () => {
  let component: EditWorkOrderStatusComponent;
  let fixture: ComponentFixture<EditWorkOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkOrderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
