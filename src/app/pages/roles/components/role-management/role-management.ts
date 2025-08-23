import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@shared/animations/fade-in-right.animation';
import { scaleIn400ms } from '@shared/animations/scale-in.animation';
import { CheckboxComponent } from '@shared/components/reusables/checkbox/checkbox.component';
import { GsSelectComponent } from '@shared/components/reusables/gs-select/gs-select.component';
import { GsTextComponent } from '@shared/components/reusables/gs-text/gs-text.component';
import { Alert } from '@shared/services/alert';
import { statesSelect } from '@shared/utils/global-constants.util';
import {
  PermissionsByRoleResponse,
  PermissionsResponse,
} from '../../models/role-response.interface';
import { Role } from '../../services/role';
import { componentRoleSetting } from '../role-list/role-list.config';

@Component({
  selector: 'app-role-management',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    GsTextComponent,
    GsSelectComponent,
    MatIconModule,
    CheckboxComponent,
  ],
  templateUrl: './role-management.html',
  animations: [scaleIn400ms, fadeInRight400ms],
})
export class RoleManagement {
  private readonly fb$ = inject(FormBuilder);
  private readonly roleService = inject(Role);
  private readonly alert = inject(Alert);
  private readonly route = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly componentRoleManagement = componentRoleSetting;

  form$!: FormGroup;
  menuPermissions!: PermissionsByRoleResponse[];
  permissions!: PermissionsResponse[];
  private selectedPermissions: PermissionsResponse[] = [];
  selectedPermissionsList!: PermissionsResponse[];

  indexMenu = 0;
  roleId: number = 0;
  states$ = statesSelect;

  initForm(): void {
    this.form$ = this.fb$.group({
      roleId: [''],
      name: [''],
      description: [''],
      state: new FormControl(null),
    });
  }

  constructor() {
    this.initForm();
    this.activatedRoute.params.subscribe((params) => {
      this.roleId = params['roleId'];
    });
  }

  ngOnInit(): void {
    let indexMenu = 0;
    if (this.roleId > 0) {
      this.roleById(this.roleId);
    }
    this.roleId = this.roleId == undefined ? 0 : this.roleId;
    this.roleService.permissionByRoleId(this.roleId).subscribe((resp) => {
      resp = resp.filter(
        (menu: PermissionsByRoleResponse) => menu.fatherId !== null
      );
      this.menuPermissions = resp;
      this.setIndexMenu(indexMenu);
    });
  }

  roleById(roleId: number): void {
    this.roleService.fetchRoleById(roleId);
    const roleSignal = this.roleService.roleById;
    const role = roleSignal();
    if (role) {
      this.form$.patchValue({
        roleId: role.roleId,
        name: role.name,
        description: role.description,
        state: role.state,
      });
    }
  }

  setIndexMenu(indexMenu: number) {
    this.indexMenu = indexMenu;
    this.permissions = this.menuPermissions[indexMenu].permissions;
  }
}
