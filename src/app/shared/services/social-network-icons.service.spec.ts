import { TestBed } from '@angular/core/testing';

import { SocialNetworkIconsService } from './social-network-icons.service';

describe('SocialNetworkIconsService', () => {
  let service: SocialNetworkIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialNetworkIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
