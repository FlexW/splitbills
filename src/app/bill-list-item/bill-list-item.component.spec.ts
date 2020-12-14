import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { spyPropertyGetter } from '../_helpers/test-common';
import { AuthenticationService } from '../_services';

import { BillListItemComponent } from './bill-list-item.component';

describe('BillListItemComponent', () => {
  let component: BillListItemComponent;
  let fixture: ComponentFixture<BillListItemComponent>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authenticationService = jasmine.createSpyObj('AuthenticationService', [], {
      currentUserValue: {},
    });
    // Set it here to avoid erros on creation
    spyPropertyGetter(
      authenticationService,
      'currentUserValue'
    ).and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        BrowserAnimationsModule,
      ],
      declarations: [BillListItemComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authenticationService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
