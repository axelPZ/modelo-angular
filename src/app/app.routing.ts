//importar modulos del router de angular requeridos para trabajar con las rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importamos cada uno de nuetros componentes
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

// importar el identityGuard para proteger los rutas
import { IdentityGuard } from './services/identityGuard';

//Creamos un array de objetos JSON que contengan la ruta y el componente al que llama
const appRoutes: Routes =
[
  { path: '', component: HomeComponent , canActivate:[ IdentityGuard ]},
  { path: 'inicio', component: HomeComponent, canActivate:[ IdentityGuard ]},
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'user/:id', component: UserDetailsComponent, canActivate:[ IdentityGuard ]},
  { path: 'user-edit/:id', component: UserEditComponent, canActivate:[ IdentityGuard ]},
  { path: '**', component: ErrorComponent }
];

//exportar el modulo del router
export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

