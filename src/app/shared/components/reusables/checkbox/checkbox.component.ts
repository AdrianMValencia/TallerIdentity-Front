import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-checkbox',
  imports: [CommonModule, MatIconModule, MatCheckboxModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() label: string = '';
  @Input() cssLabel: string[] = ['text-sm', 'text-am-grey-dark'];
  @Input() sublabel: string = '';
  @Input() cssSublabel: string[] = ['text-xs', 'text-am-grey'];
  @Input() positionEnd: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() key: any | string = 'ckeckbox';
  @Input() check: boolean = false;
  @Output() checked = new EventEmitter<any>();

  classSelect: string[] = [];
  classIcon: string[] = [];
  icon: any;

  ngOnInit(): void {
    this.initMode();
  }

  initMode() {
    this.classSelect = this.check
      ? ['bg-am-main-blue-light', 'cursor-pointer']
      : ['hover:bg-am-main-blue-light', 'cursor-pointer'];
    this.icon = this.check ? 'check_box' : 'check_box_outline_blank';
    this.classIcon = this.check ? ['text-am-main-blue-dark'] : ['text-gray'];
  }

  changeStatus() {
    let sendStatus: any = {};
    this.check = !this.check;
    sendStatus.check = this.check;
    sendStatus.key = this.key;
    this.checked.emit(sendStatus);
    this.initMode();
  }
}
