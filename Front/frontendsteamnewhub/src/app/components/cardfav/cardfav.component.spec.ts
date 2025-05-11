import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardfavComponent } from './cardfav.component';

describe('CardfavComponent', () => {
  let component: CardfavComponent;
  let fixture: ComponentFixture<CardfavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardfavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardfavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
