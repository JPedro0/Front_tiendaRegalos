import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }
  ngOnInit(): void { }

  clickInicio(){
    this.router.navigate(['/inicio']);
  }

  clickVender(){
    this.router.navigate(['/vender']);
  }

  clickVentas(){
    this.router.navigate(['/ventas']);
  }

  clickPromociones(){
    this.router.navigate(['/promociones']);
  }

  clickInventario(){
    this.router.navigate(['/inventario']);
  }

  clickProductos(){
    this.router.navigate(['/productos']);
  }
}
