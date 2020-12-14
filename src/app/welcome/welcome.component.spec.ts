import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { spyPropertyGetter } from '../_helpers/test-common';
import { ToolbarService } from '../_services/toolbar.service';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let toolbarService: jasmine.SpyObj<ToolbarService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    toolbarService = jasmine.createSpyObj('ToolbarService', [
      'setShowMenu',
      'setShowSideNav',
    ]);
    // spyPropertyGetter(toolbarService, 'showSideNav').and.returnValue({});

    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [
        { provide: ToolbarService, useValue: toolbarService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toolbarService = TestBed.inject(
      ToolbarService
    ) as jasmine.SpyObj<ToolbarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide toolbar menus', () => {});
});
