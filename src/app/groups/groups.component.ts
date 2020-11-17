import { Component, OnInit } from '@angular/core';
import { Group } from '../Group';
import { GROUPS } from '../mock-groups';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class groupsComponent implements OnInit {
  
  groups = GROUPS;
  //error is acceptable
  selectedGroup: Group;
  onSelect(group: Group): void {
    this.selectedGroup = group;
  }


  constructor() { }

  ngOnInit(): void {
  }
}
