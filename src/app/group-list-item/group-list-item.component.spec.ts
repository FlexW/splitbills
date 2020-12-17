import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { spyPropertyGetter } from '../_helpers/test-common';
import { AuthenticationService } from '../_services';

import { GroupListItemComponent } from './group-list-item.component';

describe('GroupListItemComponent', () => {
  let component: GroupListItemComponent;
  let fixture: ComponentFixture<GroupListItemComponent>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authenticationService = jasmine.createSpyObj('AuthenticationService', [], {
      currentUserValue: {},
    });

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
      declarations: [GroupListItemComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListItemComponent);
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
