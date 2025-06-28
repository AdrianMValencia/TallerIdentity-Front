import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { fadeInOutAnimation } from '@app/shared/animations/fade-in-out.animation';
import { sublevelMenuAnimation } from '@app/shared/animations/sublevel-menu.animation';
import { INavbarData } from '@app/shared/models/navbar-data.interface';

@Component({
  selector: 'app-sublevel-menu',
  imports: [NgClass, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sublevel-menu.html',
  styleUrls: ['./../sidebar/sidebar.scss'],
  animations: [fadeInOutAnimation, sublevelMenuAnimation],
})
export class SublevelMenu {
  private readonly router = inject(Router);

  @Input() data: INavbarData = {
    menuId: 0,
    route: '',
    icon: '',
    label: '',
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let subItem of this.data.items) {
          if (item !== subItem && subItem.expanded) {
            subItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.route)
      ? 'active-sublevel'
      : '';
  }
}
