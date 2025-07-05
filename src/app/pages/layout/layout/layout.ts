import { Component } from '@angular/core';
import { Body } from '@app/shared/components/layout/body/body';
import { Header } from '@app/shared/components/layout/header/header';
import { Sidebar } from '@app/shared/components/layout/sidebar/sidebar';
import { ISidebarToggle } from '@app/shared/models/layout/sidebar-toggle.interface';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, Body, Header],
  templateUrl: './layout.html',
})
export class Layout {
  isSidebarCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(toggle: ISidebarToggle): void {
    this.screenWidth = toggle.screenWidth;
    this.isSidebarCollapsed = toggle.collapsed;
  }
}
