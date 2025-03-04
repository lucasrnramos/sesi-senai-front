import { Component } from '@angular/core';
import { ModuleLayoutComponent } from '../../shared/components/module-layout/module-layout.component';
import { MenuItem } from '../../shared/interfaces/system/system-interfaces';
import { Router, Routes } from '@angular/router';
import { MenuService } from '../../core/services/utils/menu.service';

@Component({
  selector: 'app-main-view',
  imports: [
    ModuleLayoutComponent
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  protected menu: Routes = [];

  constructor(
    private _route: Router,
    private _menuService: MenuService
  ){}

  ngOnInit(): void {
    this.menu = this._menuService.extractMenuOf('main');

    if(this._route.url === '/main') {
      this._route.navigate(['/main/home']);
    }
  }
}
