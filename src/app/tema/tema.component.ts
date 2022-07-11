import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTema: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token==''){
      this.router.navigate(['/entrar'])
      alert('Sua sessão expirou, faça novamente o login para continuar navegando.')
    }
      if(environment.tipo != 'adm'){
        this.alertas.showAlertInfo('Acesso permitido apenas ao administrador.')
        this.router.navigate(['/inicio'])
      }
    this.findAllTemas()
  }
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTema = resp
    })
  }
  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTemas
      this.tema = new Tema()
    })
  }

}
