import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmSenha: string
  tipoUsuario: string
  idUsuario: number

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token==''){
      this.router.navigate(['/entrar'])
    }
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUser(this.idUsuario)
  }


  confirmarSenha(event: any){
    this.confirmSenha = event.target.value
  }
  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuario.tipo =this.tipoUsuario

    if(this.usuario.senha != this.confirmSenha){
      alert('As senhas devem ser iguais!')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((
        resp: Usuario)=>{
          this.usuario = resp
          this.router.navigate(['/entrar'])
          alert('Usuário cadastrado com sucesso, porfavor faça o login novamente!')
          environment.token =''
          environment.nome= ''
          environment.foto = ''
          environment.id = 0
          this.router.navigate(['/entrar'])
        })
        
    }
  }
  findByIdUser(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

}
