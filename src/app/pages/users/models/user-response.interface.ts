export interface UserResponse {
  userId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  state?: string;
  stateDescription?: any;
  icEdit: string;
  icDelete: string;
}
