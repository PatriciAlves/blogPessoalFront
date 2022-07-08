import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(environment.token==''){
      this.router.navigate(['/entrar'])
      alert('Sua sessão expirou, faça novamente o login para continuar navegando.')
    }
  }

}
