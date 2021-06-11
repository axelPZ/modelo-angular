import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// importacion para la creacion de formularios
import { FormsModule } from '@angular/forms';

// importar el modulo para hacer las peticiones AJAX
import { HttpClientModule } from '@angular/common/http';

// el routing
import { routing, appRoutingProviders } from './app.routing';

// proteger las rutas, tambien necesitamos el userServir
import { IdentityGuard } from './services/identityGuard';
import { UserService } from './services/user';

// COMPONENTES
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    UserDetailsComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,

  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
