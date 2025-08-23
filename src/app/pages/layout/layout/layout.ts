import { Component } from '@angular/core';
import { Body } from '@shared/components/layout/body/body';
import { Header } from '@shared/components/layout/header/header';
import { Sidebar } from '@shared/components/layout/sidebar/sidebar';
import { ISidebarToggle } from '@shared/models/layout/sidebar-toggle.interface';

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
