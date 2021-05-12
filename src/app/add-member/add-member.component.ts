import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.sass'],
})
export class AddMemberComponent implements OnInit {
  @Output() newIsOnEvent = new EventEmitter<boolean>();
  @Output() newMemberListEvent = new EventEmitter<string[]>();

  @Input() isOn: boolean = false;
  @Input() memberList: string[] = [];

  memberName: string = '';

  SendIsOn(value: boolean) {
    this.newIsOnEvent.emit(value);
  }

  SendMemberList(value: string[]) {
    this.newMemberListEvent.emit(value);
  }

  constructor() {}

  ngOnInit(): void {}

  addMember(member: string): void {
    this.memberList.push(member);
    console.log(member + ' added');
  }

  addClicked(): void {
    this.addMember(this.memberName);
    console.log(this.memberList);
    this.memberName = '';
  }

  finishGroup(): void {
    console.log(this.memberList);
  }
}
