import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsDetailsComponent } from './ships-details.component';

describe('ShipsDetailsComponent', () => {
  let component: ShipsDetailsComponent;
  let fixture: ComponentFixture<ShipsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
