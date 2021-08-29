import { User } from '../models/user.model';
import {UserRole} from "../enums/userRoles.enum";

export function setHeaders(access_token: string) {
  return {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    // responseType: 'json'
  };
}

export function isAdmin(user: User): boolean {
  if (!user) return false;
  return user.role == UserRole.Admin;
}

export function numbersOnly(event: KeyboardEvent): boolean {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

export function isEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
