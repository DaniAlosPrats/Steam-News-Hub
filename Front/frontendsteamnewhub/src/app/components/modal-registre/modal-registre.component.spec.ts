import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistreComponent } from './modal-registre.component';

describe('ModalRegistreComponent', () => {
  let component: ModalRegistreComponent;
  let fixture: ComponentFixture<ModalRegistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegistreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
