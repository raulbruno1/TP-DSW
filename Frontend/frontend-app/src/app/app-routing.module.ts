import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EnseniaComponent } from './components/ensenia/ensenia.component';
import { FuncionamientoComponent } from './components/funcionamiento/funcionamiento.component';
import { Form } from '@angular/forms';
import { authGuard } from './components/shared/auth.guard';


import { RegistroComponent } from './components/registro/registro.component';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';
import { LoginComponent } from './components/login/login.component';
import { MisdatosComponent } from './components/misdatos/misdatos.component';
import { EditUserComponent } from './components/editarusuario/editarusuario.component';
import { LoginGuard } from './components/shared/login.guard';
import { AdminCursosComponent } from './components/admin-cursos/admin-cursos.component';
import { AltaCursoComponent } from './components/alta-curso/alta-curso.component';
import { isAdminGuard } from './components/shared/is-admin.guard';



const routes: Routes = [

  { path: 'cursos', component: CursosComponent },
  { path: 'ensenia', component: EnseniaComponent },
  {path: 'funcionamiento', component: FuncionamientoComponent},
  {path: 'login',component: LoginComponent,canActivate:[LoginGuard]},
  {path: 'registro', component:RegistroComponent,canActivate:[LoginGuard]},
  {path: 'cursos/:id', component:CursoDetalleComponent },
  {path: 'misdatos',component:MisdatosComponent,canActivate:[authGuard]},
  {path: 'misdatos/editar', component: EditUserComponent,canActivate:[authGuard]},
  {path: 'admin-cursos', component: AdminCursosComponent, canActivate:[isAdminGuard]}, 
  {path: 'alta-curso', component: AltaCursoComponent, canActivate:[isAdminGuard]},
  {path: 'alta-curso/:id', component: AltaCursoComponent, canActivate:[isAdminGuard]},
  {path: '', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
