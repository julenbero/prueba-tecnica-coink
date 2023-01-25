import { TestBed } from '@angular/core/testing';

import { AllCharactersService } from './allCharacters.service';

describe('AllCharacters.ServiceService', () => {
  let service: AllCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
