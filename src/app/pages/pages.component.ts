import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../services/auth.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  constructor(private sidebarService: NbSidebarService, private menuService: NbMenuService, private authServ: AuthService, private router: Router, public auth:Auth) { }

  ngOnInit(): void {

  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout(){
    this.authServ.logout().then(res=>{console.log(res); this.router.navigate(['pages/login'])}).catch(err=>console.log(err))
  }

}
