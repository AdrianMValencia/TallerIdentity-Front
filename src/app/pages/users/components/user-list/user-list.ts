import { Component, inject } from '@angular/core';
import { ListTableComponent } from "@app/shared/components/reusables/list-table/list-table.component";
import { RowClick } from '@app/shared/models/reusables/rowclick-interface';
import { UserResponse } from '../../models/user-response.interface';
import { User } from '../../services/user';
import { componentUserSetting } from './user-list.config';
import { scaleIn400ms } from '@app/shared/animations/scale-in.animation';
import { fadeInRight400ms } from '@app/shared/animations/fade-in-right.animation';
import { MatIcon } from '@angular/material/icon';
import { SearchBoxComponent } from "@app/shared/components/reusables/search-box/search-box.component";
import { SearchBox } from '@app/shared/models/reusables/search-options.interface';

@Component({
  selector: 'app-user-list',
  imports: [ListTableComponent, MatIcon, SearchBoxComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  animations: [scaleIn400ms, fadeInRight400ms]
})
export class UserList {

  public readonly userService = inject(User);
  public readonly componentUser$ = componentUserSetting;

  iconUser$ = 'groups';

  rowClick(event: RowClick<UserResponse>) {
    console.log("event ", event);
  }

  search(data: SearchBox) {
    this.componentUser$.filters.numFilter = data.searchValue;
    this.componentUser$.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = '';

    if (this.componentUser$.filters.textFilter != null) {
      str += `&numFilter=${this.componentUser$.filters.numFilter}&textFilter=${this.componentUser$.filters.textFilter}`;
    }

    if (this.componentUser$.filters.stateFilter != null) {
      str += `&stateFilter=${this.componentUser$.filters.stateFilter}`;
    }

    if (this.componentUser$.filters.refresh == true) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.componentUser$.filters.refresh = false;
    }

    this.componentUser$.getInputs = str;
  }
}
