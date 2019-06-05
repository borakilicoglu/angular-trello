import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BaordsComponent } from './boards.component';
import { QuoteService } from './quote.service';

describe('HomeComponent', () => {
  let component: BaordsComponent;
  let fixture: ComponentFixture<BaordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, HttpClientTestingModule],
      declarations: [BaordsComponent],
      providers: [QuoteService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
