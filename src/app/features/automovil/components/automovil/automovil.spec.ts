import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automovil } from './automovil';

describe('Automovil', () => {
  let component: Automovil;
  let fixture: ComponentFixture<Automovil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Automovil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Automovil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
