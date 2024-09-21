import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


import { CursosComponent } from './components/cursos/cursos.component';
import { FuncionamientoComponent } from './components/funcionamiento/funcionamiento.component';
import { EnseniaComponent } from './components/ensenia/ensenia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { RegistroComponent } from './components/registro/registro.component';


import { CookieService } from 'ngx-cookie-service';


import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CursoDetalleComponent } from './components/curso-detalle/curso-detalle.component';
import { LoginComponent } from './components/login/login.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { MisdatosComponent } from './components/misdatos/misdatos.component';
import { EliminarDialogComponent } from './components/eliminar-dialog/eliminar-dialog.component';
import { ErrorAvisoComponent } from './components/error-aviso/error-aviso.component';
import { EditUserComponent } from './components/editarusuario/editarusuario.component';
import { ProgressSpinner } from "./components/shared/spinner/spinner.component";
import { RequestInterceptor } from './components/shared/request.interceptor';
import { AltaCursoComponent } from './components/alta-curso/alta-curso.component';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';




@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CursosComponent,
        FuncionamientoComponent,
        EnseniaComponent,
        InicioComponent,
        RegistroComponent,
        CursoDetalleComponent,
        LoginComponent,
        SuccessDialogComponent,
        MisdatosComponent,
        EliminarDialogComponent,
        ErrorAvisoComponent,
        EditUserComponent,
        AltaCursoComponent,


    ],
    providers: [importProvidersFrom(HttpClientModule),
        CookieService,
        ProgressSpinner,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        FormsModule,
        MatDialogModule,
        RouterModule,
        NotifierModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        ProgressSpinner,
        MatSelectModule,
        MatPaginatorModule,
        

    ]
})
export class AppModule { }

