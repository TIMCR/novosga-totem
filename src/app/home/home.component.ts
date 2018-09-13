import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private secretarias_selecionadas = [null];
  private secretarias_selecionadas_object = [null];
  private secretaria_padrao = 0;

  constructor(private router: Router) {
    if (localStorage.getItem("totem.credenciais") == "" || localStorage.getItem("totem.credenciais") === null) localStorage.setItem("totem.credenciais", "{}");
    if (localStorage.getItem("totem.servidor") == "" || localStorage.getItem("totem.servidor") === null) localStorage.setItem("totem.servidor", "{}");
    if (localStorage.getItem("totem.servicos") == "" || localStorage.getItem("totem.servicos") === null) localStorage.setItem("totem.servicos", "[]");
    if (localStorage.getItem("totem.servicos_selecionados") == "" || localStorage.getItem("totem.servicos_selecionados") === null) localStorage.setItem("totem.servicos_selecionados", "[]");

    setTimeout(()=>{
      if (localStorage.getItem("totem.secretarias_completo") == null || localStorage.getItem("totem.secretarias_completo") == "[]" ||
          localStorage.getItem("totem.secretarias_completo") == "" ) {
        localStorage.setItem("totem.secretarias_completo", "[]");
        window.alert("Não há secretarias selecionadas! Por favor, efetue essa configuração. Erro: totem.secretarias_completo é nulo ou vazio.");
        this.router.navigateByUrl("/configuracao");
      } else {
        this.secretarias_selecionadas_object = JSON.parse(localStorage.getItem("totem.secretarias_completo"));
        if (this.secretarias_selecionadas_object.length == 0) {
          window.alert("Não há secretarias selecionadas! Por favor, efetue essa configuração. Erro: Tamanho de secretarias_selecionadas_object é 0");
          this.router.navigateByUrl("/configuracao");
        }
      }
    },1000);
  }

  ngOnInit() {
  }

  quantasSecretarias():number{
    var count = 0;
    this.secretarias_selecionadas_object.forEach(e=>{
      count++;
    });
    return count;
  }

  go(){
    if (this.quantasSecretarias() == 0) {
      window.alert("Não há secretarias selecionadas! Por favor, efetue essa configuração. Erro: O número de secretarias em secretarias_selecionas_object é 0.");
      this.router.navigateByUrl("/configuracao");
    } else {
      this.router.navigateByUrl('/secretaria');
    }
  }

}
