import { ComponentFixture, TestBed } from '@angular/core/testing';

import { groupsComponent } from './groups.component';

describe('groupsComponent', () => {
  let component: groupsComponent;
  let fixture: ComponentFixture<groupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ groupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(groupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
