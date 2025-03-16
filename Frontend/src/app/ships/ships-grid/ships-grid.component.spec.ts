import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsGridComponent } from './ships-grid.component';

describe('ShipsGridComponent', () => {
  let component: ShipsGridComponent;
  let fixture: ComponentFixture<ShipsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
