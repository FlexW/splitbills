import { ComponentFixture, TestBed } from '@angular/core/testing';
import { spyPropertyGetter } from '../_helpers/test-common';
import { ToolbarService } from '../_services/toolbar.service';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let toolbarService: jasmine.SpyObj<ToolbarService>;

  beforeEach(async () => {
    toolbarService = jasmine.createSpyObj('ToolbarService', [
      'setShowMenu',
      'setShowSideNav',
    ]);
    // spyPropertyGetter(toolbarService, 'showSideNav').and.returnValue({});

    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [{ provide: ToolbarService, useValue: toolbarService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    toolbarService = TestBed.inject(
      ToolbarService
    ) as jasmine.SpyObj<ToolbarService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide toolbar menus', () => {});
});
