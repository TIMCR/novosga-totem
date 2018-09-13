import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-configuracoes-servidor',
  templateUrl: './configuracoes-servidor.component.html',
  styleUrls: ['./configuracoes-servidor.component.css']
})
export class ConfiguracoesServidorComponent implements OnInit {
  servidor;
  credenciais;

  constructor(private router: Router, private http: HttpClient) { 
    this.getStorage();
  }

  private getStorage() {
    if (localStorage.getItem("totem.servidor") !== null && localStorage.getItem("totem.credenciais") !== null) {
      this.servidor = JSON.parse(localStorage.getItem("totem.servidor"));
      this.credenciais = JSON.parse(localStorage.getItem("totem.credenciais"));
    }
    else {
      this.servidor = JSON.parse('{"url":"","client_id":"","client_secret":""}');
      this.credenciais = JSON.parse('{"user":"","password":""}');
      localStorage.setItem("totem.servidor", JSON.stringify(this.servidor));
      localStorage.setItem("totem.credenciais", JSON.stringify(this.credenciais));
    }
  }

  save() {
    this.servidor.url = jQuery("#url").val();
    this.servidor.client_id = jQuery("#client_id").val();
    this.servidor.client_secret = jQuery("#client_secret").val();
    this.credenciais.user = jQuery("#user").val();
    this.credenciais.password = jQuery("#password").val();
    localStorage.setItem("totem.servidor", JSON.stringify(this.servidor));
    localStorage.setItem("totem.credenciais", JSON.stringify(this.credenciais));
    this.router.navigateByUrl('/configuracao');
  }
  ngOnInit() {
  }

}
