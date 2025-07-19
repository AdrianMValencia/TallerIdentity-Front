import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { SplitButton } from '../../../models/reusables/split-button.interface';

@Component({
  selector: 'app-split-button',
  imports: [MatTooltip, MatIcon, MatMenuTrigger, MatMenu, NgClass],
  templateUrl: './split-button.component.html',
})
export class SplitButtonComponent {
  ppalButton: SplitButton = {
    type: 'button',
    label: '',
    icon: null!,
    value: 0,
  };

  icArrowDropDown = 'arrow_drop_down';

  @Input() configButtons: SplitButton[] = [];
  @Output() doThisFunction = new EventEmitter<number>();

  actionsArray: SplitButton[] = [];

  ngOnInit(): void {
    this.buildButton();
  }

  buildButton() {
    this.configButtons.forEach((element) => {
      if (element.type == 'button') {
        this.ppalButton.icon = element.icon;
        this.ppalButton.label = element.label;
        this.ppalButton.value = element.value;
      } else {
        this.actionsArray.push(element);
      }
    });
  }

  setAction(action: number) {
    this.doThisFunction.emit(action);
  }
}
