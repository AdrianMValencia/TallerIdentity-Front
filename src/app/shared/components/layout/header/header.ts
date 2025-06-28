import { CdkMenuTrigger } from '@angular/cdk/menu';
import { NgClass } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { userItems } from '@app/shared/utils/global-constants.util';

@Component({
  selector: 'app-header',
  imports: [NgClass, CdkMenuTrigger],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  userItems = userItems;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }
}
