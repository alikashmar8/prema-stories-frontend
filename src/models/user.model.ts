import { UserRole } from './../enums/userRoles.enum';
export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  access_token?: string;
  role?: UserRole;
}
