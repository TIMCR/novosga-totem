import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-configuracoes-secretarias',
  templateUrl: './configuracoes-secretarias.component.html',
  styleUrls: ['./configuracoes-secretarias.component.css']
})
export class ConfiguracoesSecretariasComponent implements OnInit {
  private servidor;
  private credenciais;
  private access_token;
  secretarias = [];
  private secretarias_selecionadas_object = [];
  servicos = [];
  private servicos_count = 0;
  private servicos_selecionados = [];
  private servicos_selecionados_count = 0;

  constructor(private router: Router, private http: HttpClient) {
    if (localStorage.getItem("totem.servidor") !== null && localStorage.getItem("totem.credenciais") !== null) {
      this.servidor = JSON.parse(localStorage.getItem("totem.servidor"));
      this.credenciais = JSON.parse(localStorage.getItem("totem.credenciais"));
      this.verifyToken();
    }else{
      alert("Não há configuração de servidor e usuário neste aparelho. Por favor, configure isto primeiro.");
      this.router.navigateByUrl('/configuracao/servidor');
    }
  }

  ngOnInit() {
  }



  private getSecretarias() {
    jQuery.ajax({
      type: "get",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.access_token,
      },
      url: this.servidor.url.concat("/api/unidades"),
      dataType: "json",
      success: (data, textStatus, xhr) => {
        while (this.secretarias.length != 0) {
          this.secretarias.pop();
        }
        this.secretarias = JSON.parse(JSON.stringify(data));
        localStorage.setItem("totem.secretarias_dados", JSON.stringify(this.secretarias));
      },
      error: (data, textStatus, xhr) => {
        window.alert("Algo deu errado... Favor tentar novamente mais tarde");
        this.router.navigateByUrl("/configuracao");
      }
    });
  }

  private getSecretariaById(id) {
    var secretaria: any = "";
    this.secretarias.forEach(element => {
      if (element.id == id) {
        secretaria = element;
      }
    });
    return secretaria;
  }
  private getServicoById(id) {
    var servico: any = "";
    this.servicos.forEach(element => {
      if (element.id == id) {
        servico = element;
      }
    });
    return servico;
  }
  private isSecretariaSelecionadaById(id): boolean {
    var ret: boolean = false;
    this.secretarias_selecionadas_object.forEach(element => {
      if (element.id == id) {
        ret = true;
      }
    });
    return ret;
  }
  private isServicoSelecionadoById(id): boolean {
    var ret: boolean = false;
    this.servicos_selecionados.forEach(element => {
      if (element.servico.id == id) {
        ret = true;
      }
    });
    return ret;
  }

  private popServicoSelecionadoById(id) {
    var servicos_selecionados = this.servicos_selecionados;
    while (this.servicos_selecionados.length != 0) {
      this.servicos_selecionados.pop();
    }
    servicos_selecionados.forEach(e => {
      if (id != e.servico.id) {
        this.servicos_selecionados.push(e);
      }
    });
    localStorage.setItem("totem.servicos_selecionados", JSON.stringify(this.servicos_selecionados));

  }
  private popServicoSelecionadoBySecretariaId(id) {
    var servicos_selecionados = this.servicos_selecionados;
    while (this.servicos_selecionados.length != 0) {
      this.servicos_selecionados.pop();
    }
    servicos_selecionados.forEach(e => {
      if (id != e.secretaria.id) {
        this.servicos_selecionados.push(e);
      }
    });
    localStorage.setItem("totem.servicos_selecionados", JSON.stringify(this.servicos_selecionados));

  }

  private verifyToken() {
    jQuery.ajax({
      type: "post",
      url: this.servidor.url.concat("/api/token"),
      data: "client_id=".concat(this.servidor.client_id).concat("&client_secret=").concat(this.servidor.client_secret).concat("&grant_type=password&username=").concat(this.credenciais.user).concat("&password=").concat(this.credenciais.password),
      dataType: "json",
      success: (data, textStatus, xhr) => {
        this.access_token = data.access_token;

        this.secretarias_selecionadas_object = JSON.parse(localStorage.getItem("totem.secretarias_completo"));

        this.servicos = JSON.parse(localStorage.getItem("totem.servicos"));
        this.servicos_selecionados = JSON.parse(localStorage.getItem("totem.servicos_selecionados"));

        this.getSecretarias();
      },
      error: (data, textStatus, xhr) => {
        window.alert("O Client ID, Client Secret, Usuário ou Senha estão incorretos. Por favor, verificar e tentar novamente mais tarde.");
        this.router.navigateByUrl("/configuracao/servidor");
      }
    });
  }

  private get_services() {
    while (this.servicos.length != 0) {
      this.servicos.pop();
    }
    this.secretarias_selecionadas_object.forEach((value) => {
      if (value !== null) {
        jQuery.ajax({
          type: "get",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this.access_token,
          },
          url: this.servidor.url.concat("/api/unidades/").concat(value.id).concat("/servicos"),
          dataType: "json",
          success: (data, textStatus, xhr) => {
            JSON.parse(JSON.stringify(data)).forEach(element => {
              var servico = element;
              servico.secretaria = value;
              this.servicos.push(servico);
            });
          },
          error: (data, textStatus, xhr) => {
            window.alert("Algo deu errado... Favor tentar novamente mais tarde");
            this.router.navigateByUrl("/configuracao");
          }
        });
      }
    });
    setTimeout(() => {
      localStorage.setItem("totem.servicos", JSON.stringify(this.servicos));
    },"800");
  }



  private click_secretaria(id) {
    while(this.secretarias_selecionadas_object.length != 0){
      this.secretarias_selecionadas_object.pop();
    }
    this.secretarias.forEach(element => {
      if (jQuery("#secretaria_".concat(element.id)).is(":checked")) {
        this.secretarias_selecionadas_object.push(element);
      }
    });
    if (!jQuery("#secretaria_".concat(id)).is(":checked")){
      this.popServicoSelecionadoBySecretariaId(id);
    }
    localStorage.setItem("totem.secretarias_completo", JSON.stringify(this.secretarias_selecionadas_object));
    this.secretarias_selecionadas_object = JSON.parse(localStorage.getItem("totem.secretarias_completo"));



    this.get_services();
  }

  private click_servico(id) {
    while (this.servicos_selecionados.length != 0) {
      this.servicos_selecionados.pop();
    }
    var servicos = [];
    this.servicos_selecionados.forEach(e=>{
      if(this.isSecretariaSelecionadaById(e.secretaria.id)){
        servicos.push(e.servico.id);
      }
    });
    Object.entries(this.servicos).forEach(([key, servico]) => {
      if (jQuery("#servico_".concat(servico.servico.id)).is(":checked")) {
        this.servicos_selecionados.push(servico);
      }
    });
    localStorage.setItem("totem.servicos_selecionados", JSON.stringify(this.servicos_selecionados));
  }
}
