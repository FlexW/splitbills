import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

import { BillsComponent } from './bills.component';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BillsService } from '../_services/bills.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../_services';
import { spyPropertyGetter } from '../_helpers/test-common';

describe('BillsComponent', () => {
  let component: BillsComponent;
  let fixture: ComponentFixture<BillsComponent>;
  let billsService: jasmine.SpyObj<BillsService>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthenticationService', [], {
      currentUserValue: {},
    });
    // Set it here to avoid erros on creation
    spyPropertyGetter(authService, 'currentUserValue').and.returnValue(null);

    billsService = jasmine.createSpyObj('BillsService', [
      'getBillsWithUsersByUserId',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BillsComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        ScrollingModule,
      ],
      providers: [
        { provide: BillsService, useValue: billsService },
        { provide: AuthenticationService, useValue: authService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    billsService = TestBed.inject(BillsService) as jasmine.SpyObj<BillsService>;
  });

  it('should compile', () => {
    billsService.getBillsWithUsersByUserId.and.returnValue(of([]));
    expect(component).toBeTruthy();
  });
});
