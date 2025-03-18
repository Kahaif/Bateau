import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsGridItemComponent } from './ships-grid-item.component';

describe('ShipsGridItemComponent', () => {
  let component: ShipsGridItemComponent;
  let fixture: ComponentFixture<ShipsGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipsGridItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipsGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
