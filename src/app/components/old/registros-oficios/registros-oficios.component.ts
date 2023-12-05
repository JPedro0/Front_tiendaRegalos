import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registros-oficios',
  templateUrl: './registros-oficios.component.html',
  styleUrls: ['./registros-oficios.component.css']
})
export class RegistrosOficiosComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void { }

  genRespuesta(){
    this.router.navigate(['respuesta'], {relativeTo:this.route});
  }
}
