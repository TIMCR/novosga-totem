import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem("totem.credenciais") == "" || localStorage.getItem("totem.credenciais") === null) localStorage.setItem("totem.credenciais", "{}");
    if (localStorage.getItem("totem.servidor") == "" || localStorage.getItem("totem.servidor") === null) localStorage.setItem("totem.servidor", "{}");
    if (localStorage.getItem("totem.servicos") == "" || localStorage.getItem("totem.servicos") === null) localStorage.setItem("totem.servicos", "[]");
    if (localStorage.getItem("totem.servicos_selecionados") == "" || localStorage.getItem("totem.servicos_selecionados") === null) localStorage.setItem("totem.servicos_selecionados", "[]");
  }

  resetar(){
    localStorage.setItem("totem.servicos", "[]");
    localStorage.setItem("totem.servicos_selecionados", "[]");
    localStorage.setItem("totem.secretarias", "[]");
    localStorage.setItem("totem.secretarias_dados", "[]");
    localStorage.setItem("totem.secretarias_completo", "[]");
  }

}
