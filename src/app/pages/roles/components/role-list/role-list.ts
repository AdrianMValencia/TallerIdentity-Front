import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { fadeInRight400ms } from '@shared/animations/fade-in-right.animation';
import { scaleIn400ms } from '@shared/animations/scale-in.animation';
import { FilterMenuStatesComponent } from '@shared/components/reusables/filter-menu-states/filter-menu-states.component';
import { GenericButtonComponent } from '@shared/components/reusables/generic-button/generic-button.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxComponent } from '@shared/components/reusables/search-box/search-box.component';
import { SplitButtonComponent } from '@shared/components/reusables/split-button/split-button.component';
import { RowClick } from '@shared/models/reusables/rowclick-interface';
import { SearchBox } from '@shared/models/reusables/search-options.interface';
import { Actions } from '@shared/models/reusables/split-button.interface';
import { RoleResponse } from '../../models/role-response.interface';
import { Role } from '../../services/role';
import { componentRoleSetting } from './role-list.config';

@Component({
  selector: 'app-role-list',
  imports: [
    ListTableComponent,
    MatIcon,
    SearchBoxComponent,
    FilterMenuStatesComponent,
    SplitButtonComponent,
    GenericButtonComponent,
  ],
  templateUrl: './role-list.html',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class RoleList {
  public readonly roleService = inject(Role);
  private readonly router = inject(Router);
  public readonly componentRole$ = componentRoleSetting;

  iconRole$ = 'add_moderator';
  resetChecks: boolean = false;

  rowClick(rowClick: RowClick<RoleResponse>) {
    let action = rowClick.action;
    let role = rowClick.row;

    switch (action) {
      case 'edit':
        this.roleEdit(role);
        break;
      case 'delete':
        // this.roleDelete(role);
        break;
    }
  }

  roleEdit(roleData: RoleResponse) {
    this.router.navigate(['/roles/editar', roleData.roleId]);
  }

  search(data: SearchBox) {
    this.componentRole$.filters.numFilter = data.searchValue;
    this.componentRole$.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = '';

    if (this.componentRole$.filters.textFilter != null) {
      str += `&numFilter=${this.componentRole$.filters.numFilter}&textFilter=${this.componentRole$.filters.textFilter}`;
    }

    if (this.componentRole$.filters.stateFilter != null) {
      str += `&stateFilter=${this.componentRole$.filters.stateFilter}`;
    }

    if (this.componentRole$.filters.refresh == true) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.componentRole$.filters.refresh = false;
    }

    this.componentRole$.getInputs = str;
  }

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.componentRole$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.initFilterReset();
        this.resetChecks = !this.resetChecks;
        break;
    }
  }

  initFilterReset() {
    this.componentRole$.filters = { ...this.componentRole$.initFilters };
    this.formatGetInputs();
  }

  setDataFilterStates(data: []) {
    if (data.length) {
      this.componentRole$.filters.stateFilter = data.join('-');
    } else {
      this.componentRole$.filters.stateFilter = '1';
    }
    this.formatGetInputs();
  }

  newRole() {
    this.router.navigate(['/roles/crear']);
  }

  setGetInputsRole(refresh: boolean) {
    this.componentRole$.filters.refresh = refresh;
    this.formatGetInputs();
  }
}
