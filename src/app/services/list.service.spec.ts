import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [ListService]
  }));

  it('should be created', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
  });
});
