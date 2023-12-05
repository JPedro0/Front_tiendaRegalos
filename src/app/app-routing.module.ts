import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/old/registro/registro.component';
import { RegistrosOficiosComponent } from './components/old/registros-oficios/registros-oficios.component';
import { GenRespuestaComponent } from './components/old/gen-respuesta/gen-respuesta.component';
import { InfoPersonalComponent } from './components/old/info-personal/info-personal.component';
import { MenuPromocionesComponent } from './components/menu-promociones/menu-promociones.component';
import { MenuInventarioComponent } from './components/menu-inventario/menu-inventario.component';
import { MenuComprasComponent } from './components/menu-compras/menu-compras.component';
import { RegistroComprasComponent } from './components/registro-compras/registro-compras.component';

const routes: Routes = [
  //-------PATH DE USUARIOS
  {path: 'inicio', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'promociones', component: MenuPromocionesComponent},
  {path: 'inventario', component: MenuInventarioComponent},
  {path: 'ventas', component: MenuComprasComponent},
  {path: 'vender', component: RegistroComprasComponent},
  //-------PATH DEFAULT
  {path: '**', redirectTo: '/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
