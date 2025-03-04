import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main-view/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { routeGuard } from './core/guards/route.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ConvidarComponent } from './pages/main-view/convidar/convidar.component';
import { GerenciarComponent } from './pages/main-view/gerencial/gerencial.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  { path: 'auth/login', component:LoginComponent, canActivate: [loggedGuard]},
  { path: 'recuperar-senha/:hash', component:RecuperarSenhaComponent, canActivate: [loggedGuard]},
  { path: 'cadastrar/:hash', component:CadastrarComponent, canActivate: [loggedGuard]},
  { path: 'main', component: MainViewComponent, canActivate: [routeGuard], children: [
    { path: 'home', component: HomeComponent, title: 'Home', canActivate: [routeGuard] },
    { path: 'convidar', component: ConvidarComponent, title: 'Convidar', canActivate: [routeGuard] },
    { path: 'gerencial', component: GerenciarComponent, title: 'Gerencial', canActivate: [routeGuard] },
  ] },

  // { path: 'system-settings', component: SystemSettingsComponent, canActivate: [routeGuard] },

  { path: '**', component: NotFoundPageComponent},
];
