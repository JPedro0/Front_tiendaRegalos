import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/old/registro/registro.component';
import { RegistrosOficiosComponent } from './components/old/registros-oficios/registros-oficios.component';
import { BottombarComponent } from './components/bottombar/bottombar.component';
import { SharedModule } from './components/shared/shared.module';
import { GenRespuestaComponent } from './components/old/gen-respuesta/gen-respuesta.component';
import { InfoPersonalComponent } from './components/old/info-personal/info-personal.component';
import { MenuInventarioComponent } from './components/menu-inventario/menu-inventario.component';
import { MenuPromocionesComponent } from './components/menu-promociones/menu-promociones.component';
import { RegistroComprasComponent } from './components/registro-compras/registro-compras.component';
import { MenuComprasComponent } from './components/menu-compras/menu-compras.component';
import { InventarioService } from './service/inventario.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    InicioComponent,
    FooterComponent,
    RegistroComponent,
    RegistrosOficiosComponent,
    BottombarComponent,
    GenRespuestaComponent,
    InfoPersonalComponent,
    MenuInventarioComponent,
    MenuPromocionesComponent,
    RegistroComprasComponent,
    MenuComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
  ],
  providers: [InventarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }