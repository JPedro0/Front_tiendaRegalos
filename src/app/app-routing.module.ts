import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuPromocionesComponent } from './components/menu-promociones/menu-promociones.component';
import { MenuInventarioComponent } from './components/menu-inventario/menu-inventario.component';
import { MenuComprasComponent } from './components/menu-compras/menu-compras.component';
import { RegistroComprasComponent } from './components/registro-compras/registro-compras.component';
import { MenuProductosComponent } from './components/menu-productos/menu-productos.component';

const routes: Routes = [
  //-------PATH DE USUARIOS
  {path: 'inicio', component: InicioComponent},
  {path: 'productos', component: MenuProductosComponent},
  {path: 'promociones', component: MenuPromocionesComponent},
  {path: 'inventario', component: MenuInventarioComponent},
  {path: 'ventas', component: MenuComprasComponent},
  {path: 'vender', component: RegistroComprasComponent},
  //-------PATH DEFAULT
  {path: '**', redirectTo: '/inicio', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
