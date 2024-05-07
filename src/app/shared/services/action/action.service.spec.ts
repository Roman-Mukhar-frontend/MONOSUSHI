import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';
import {HttpClientTestingModule, HttpTestingController,} from '@angular/common/http/testing';

describe('ActionService', () => {
  let service: ActionService;
  // let httpTestingController: HttpTestingController;
  // let HttpClientTestingController: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        // HttpClientTestingController
      ]
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



});



