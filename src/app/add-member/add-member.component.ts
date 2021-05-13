import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.sass'],
})
export class AddMemberComponent {
  @Output() newIsOnEvent = new EventEmitter<boolean>();
  @Output() newMemberListEvent = new EventEmitter<string[]>();

  @Input() isOn = false;
  @Input() memberList: string[] = [];

  memberName = '';

  SendIsOn(value: boolean): void {
    this.newIsOnEvent.emit(value);
  }

  SendMemberList(value: string[]): void {
    this.newMemberListEvent.emit(value);
  }

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
