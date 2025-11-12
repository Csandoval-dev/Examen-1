import { TestBed } from '@angular/core/testing';

import { Automovil } from './automovil';

describe('Automovil', () => {
  let service: Automovil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Automovil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
