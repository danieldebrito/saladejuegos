import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface MenuItem {
  redirectTo: string;
  name: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminSidebarService {

  constructor( private http: HttpClient ) { }

  getMenuItems(): any{
    return this.http.get<MenuItem[]>('/assets/menus/adminSidebar/items-menu-admin.json');
  }

}
