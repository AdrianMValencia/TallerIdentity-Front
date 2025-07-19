import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement {
  private readonly fb$ = inject(FormBuilder);

  user!: FormGroup;

  initForm(): void {
    this.user = this.fb$.group({
      userId: new FormControl(0),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      phone: new FormControl(null),
      address: new FormControl(null),
      state: new FormControl(null),
    });
  }
}
