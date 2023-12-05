import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.css']
})
export class BottombarComponent {
  constructor(private router: Router) { }
  ngOnInit(): void { }

  clickSalir(){
    this.router.navigate(['/']);
  }
}
