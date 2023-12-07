import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottombarComponent } from './components/bottombar/bottombar.component';
import { SharedModule } from './components/shared/shared.module';
import { MenuInventarioComponent } from './components/menu-inventario/menu-inventario.component';
import { MenuPromocionesComponent } from './components/menu-promociones/menu-promociones.component';
import { RegistroComprasComponent } from './components/registro-compras/registro-compras.component';
import { MenuComprasComponent } from './components/menu-compras/menu-compras.component';
import { MenuProductosComponent } from './components/menu-productos/menu-productos.component';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
registerLocaleData(localeES, "es");

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    InicioComponent,
    FooterComponent,
    BottombarComponent,
    MenuInventarioComponent,
    MenuPromocionesComponent,
    RegistroComprasComponent,
    MenuComprasComponent,
    MenuProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
