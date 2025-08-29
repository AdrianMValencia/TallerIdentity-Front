import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { fadeInRight400ms } from '@shared/animations/fade-in-right.animation';
import { scaleIn400ms } from '@shared/animations/scale-in.animation';
import { ExportExcel } from '@shared/components/reusables/export-excel/export-excel';
import { FilterMenuStatesComponent } from '@shared/components/reusables/filter-menu-states/filter-menu-states.component';
import { GenericButtonComponent } from '@shared/components/reusables/generic-button/generic-button.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxComponent } from '@shared/components/reusables/search-box/search-box.component';
import { SplitButtonComponent } from '@shared/components/reusables/split-button/split-button.component';
import { RowClick } from '@shared/models/reusables/rowclick-interface';
import { SearchBox } from '@shared/models/reusables/search-options.interface';
import { Actions } from '@shared/models/reusables/split-button.interface';
import { UserResponse } from '../../models/user-response.interface';
import { User } from '../../services/user';
import { UserManagement } from '../user-management/user-management';
import { componentUserSetting } from './user-list.config';

@Component({
  selector: 'app-user-list',
  imports: [
    ListTableComponent,
    MatIcon,
    SearchBoxComponent,
    FilterMenuStatesComponent,
    SplitButtonComponent,
    GenericButtonComponent,
    ExportExcel,
  ],
  templateUrl: './user-list.html',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class UserList {
  public readonly userService = inject(User);
  public readonly componentUser$ = componentUserSetting;
  public readonly dialog = inject(MatDialog);

  iconUser$ = 'groups';
  resetChecks: boolean = false;

  rowClick(event: RowClick<UserResponse>) {
    console.log('event ', event);
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

  resetButton(action: Actions) {
    switch (action) {
      case 1:
        this.componentUser$.filters.refresh = true;
        this.formatGetInputs();
        break;
      case 2:
        this.initFilterReset();
        this.resetChecks = !this.resetChecks;
        break;
    }
  }

  initFilterReset() {
    this.componentUser$.filters = { ...this.componentUser$.initFilters }; // Asignando un nuevo objeto a la propiedad
    this.formatGetInputs();
  }

  // Método que configura el filtro de estados basado en el array de datos recibido
  setDataFilterStates(data: []) {
    // Si el array tiene elementos...
    if (data.length) {
      // Une los elementos del array en un solo string separados por guiones y lo asigna al filtro de estado
      this.componentUser$.filters.stateFilter = data.join('-');
    } else {
      // Si el array está vacío, asigna por defecto '1' al filtro de estado
      this.componentUser$.filters.stateFilter = '1';
    }

    // Llama a un método para aplicar o actualizar los filtros con el nuevo estado configurado
    this.formatGetInputs();
  }

  newUser() {
    this.dialog
      .open(UserManagement, {
        disableClose: true,
        width: '450px',
        enterAnimationDuration: 250,
        exitAnimationDuration: 250,
        data: { mode: 'create' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsUser(true);
        }
      });
  }

  setGetInputsUser(refresh: boolean) {
    this.componentUser$.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return 'User/Excel';
  }
}
