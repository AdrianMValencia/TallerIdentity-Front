import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { fadeInOutAnimation } from '@app/shared/animations/fade-in-out.animation';
import {
  INavbarData,
  navbarData,
} from '@app/shared/models/navbar-data.interface';
import { ISidebarToggle } from '@app/shared/models/sidebar-toggle.interface';
import { SublevelMenu } from '../sublevel-menu/sublevel-menu';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive, SublevelMenu, MatIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  animations: [fadeInOutAnimation],
})
export class Sidebar {
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.toggleCollapsed();
  }

  @Output() onToggleSideNav: EventEmitter<ISidebarToggle> = new EventEmitter();
  collapsed: boolean = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.route) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let subItem of this.navData) {
        if (item !== subItem && subItem.expanded) {
          subItem.expanded = false;
        }
      }
    }
  }
}
