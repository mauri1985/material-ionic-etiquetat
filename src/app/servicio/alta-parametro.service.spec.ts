import { TestBed } from '@angular/core/testing';

import { AltaParametroService } from './alta-parametro.service';

describe('AltaParametroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AltaParametroService = TestBed.get(AltaParametroService);
    expect(service).toBeTruthy();
  });
});
