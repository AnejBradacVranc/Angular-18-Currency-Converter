import { TestBed } from '@angular/core/testing';

import { DropdownSharedService } from './dropdown-shared.service';

describe('SharedService', () => {
  let service: DropdownSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
