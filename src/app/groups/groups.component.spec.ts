import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

import { GroupsComponent } from './groups.component';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GroupsService } from '../_services/groups.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../_services';
import { spyPropertyGetter } from '../_helpers/test-common';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;
  let groupsService: jasmine.SpyObj<GroupsService>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthenticationService', [], {
      currentUserValue: {},
    });
    // Set it here to avoid erros on creation
    spyPropertyGetter(authService, 'currentUserValue').and.returnValue(null);

    groupsService = jasmine.createSpyObj('GroupsService', [
      'getGroupsWithUsersByUserId',
    ]);

    await TestBed.configureTestingModule({
      declarations: [GroupsComponent],
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
        { provide: GroupsService, useValue: groupsService },
        { provide: AuthenticationService, useValue: authService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    groupsService = TestBed.inject(
      GroupsService
    ) as jasmine.SpyObj<GroupsService>;
  });

  it('should compile', () => {
    groupsService.getGroupsWithUsersByUserId.and.returnValue(of([]));
    expect(component).toBeTruthy();
  });
});
