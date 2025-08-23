import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatTooltip,
    MatIcon,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private readonly cd = inject(ChangeDetectorRef);

  form!: FormGroup;
  typeInput = 'password';
  visible = false;

  icVisibility = 'visibility';
  icVisibilityOff = 'visibility_off';
  icEmail = 'account_circle';

  initForm(): void {
    this.form = this.fb.group({
      email: ['adrian@gmail.con', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    this.authService
      .login(this.form.value)
      .subscribe((response: BaseApiResponse<string>) => {
        if (response.isSuccess) {
          this.router.navigate(['/users']);
        }
      });
  }

  toggleVisibility(): void {
    if (this.visible) {
      this.typeInput = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.typeInput = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
