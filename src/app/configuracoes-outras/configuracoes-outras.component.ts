import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-configuracoes-outras',
  templateUrl: './configuracoes-outras.component.html',
  styleUrls: ['./configuracoes-outras.component.css']
})
export class ConfiguracoesOutrasComponent implements OnInit {
  entidade;

  constructor(private router: Router, private http: HttpClient) { 
    this.getStorage();
  }

  private getStorage() {
    if (localStorage.getItem("totem.entidade") !== null) {
      this.entidade = JSON.parse(localStorage.getItem("totem.entidade"));
    }
    else {
      this.entidade = JSON.parse('{"nome":""}');
      localStorage.setItem("totem.entidade", JSON.stringify(this.entidade));
    }
  }

  save() {
    this.entidade.nome = jQuery("#nome").val();
    localStorage.setItem("totem.entidade", JSON.stringify(this.entidade));
    this.router.navigateByUrl('/configuracao');
  }
  ngOnInit() {
  }

}
