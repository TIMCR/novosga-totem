import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-imprimindo',
  templateUrl: './imprimindo.component.html',
  styleUrls: ['./imprimindo.component.css']
})
export class ImprimindoComponent implements OnInit {

  private id;
  prioridade;
  private servicos = [];
  private servidor;
  private credenciais;
  private access_token;
  private senha_id;
  senha_codigo = "GERANDO...";
  private senha_hash;
  private senha;
  displayString;
  private entidade;
  constructor(private route: ActivatedRoute, private router: Router, private domSanitizer: DomSanitizer) {
    if (localStorage.getItem("totem.servidor") !== null && localStorage.getItem("totem.credenciais") !== null) {
      this.servidor = JSON.parse(localStorage.getItem("totem.servidor"));
      this.credenciais = JSON.parse(localStorage.getItem("totem.credenciais"));
      this.verifyToken();
    } else {
      alert("Não há configuração de servidor e usuário neste aparelho. Por favor, configure isto primeiro.");
      this.router.navigateByUrl('/configuracao/servidor');
    }
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.prioridade = +this.route.snapshot.paramMap.get('prioridade');
    this.servicos = JSON.parse(localStorage.getItem("totem.servicos_selecionados"));
    this.entidade = JSON.parse(localStorage.getItem("totem.entidade"));
    
    var audio = jQuery("#audio").get(0);
    audio.volume = 0.25;
    audio.play();
  }
  getServico() {
    var servico: any = "";
    this.servicos.forEach(element => {
      if (element.servico.id == this.id) {
        servico = element;
      }
    });
    return servico;
  }

  private verifyToken() {
    jQuery.ajax({
      type: "post",
      url: this.servidor.url.concat("/api/token"),
      data: "client_id=".concat(this.servidor.client_id).concat("&client_secret=").concat(this.servidor.client_secret).concat("&grant_type=password&username=").concat(this.credenciais.user).concat("&password=").concat(this.credenciais.password),
      dataType: "json",
      success: (data, textStatus, xhr) => {
        this.access_token = data.access_token;
        this.callSenha();
      },
      error: (data, textStatus, xhr) => {
        window.alert("O Client ID, Client Secret, Usuário ou Senha estão incorretos. Por favor, verificar e tentar novamente mais tarde.");
        this.router.navigateByUrl("/configuracao/servidor");
      }
    });
  }

  private callSenha(){
    jQuery.ajax({
      type: "post",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.access_token,
      },
      data: JSON.stringify({
        'unidade': this.getServico().secretaria.id,
        'servico': this.id,
        'prioridade': this.prioridade,
        'cliente': {},
      }),
      url: this.servidor.url.concat("/api/distribui"),
      dataType: "json",
      success: (data, textStatus, xhr) => {
        this.senha_id = data.id;
        this.senha_codigo = data.senha.format;
        this.senha_hash = data.hash;
        this.senha = data;
        this.imprime();
      },
      error: (data, textStatus, xhr) => {
        window.alert("Algo deu errado... Favor tentar novamente mais tarde. Erro: "+textStatus);
        this.router.navigateByUrl("/");
      }
    });
  }

  private imprime() {
    var data = new Date();
    var html = "<html><head><style>@page :left{margin:0; margin-left:0;}@page :top{margin:0; margin-top:0;}@page :right{margin:0; margin-right:0;}@page{margin:0; margin-left:0; margin-top:0; margin-right:0; margin-bottom:0;}*{margin:0;padding:0;}body{font-family: Red Ring, Arial, Helvetica, sans-serif; text-align:center;}p{margin:0;padding:0;}.bold{font-weight:bold}#senha{font-size: 3rem}</style><title>".concat(this.senha_codigo).concat("</title></head><body onload=\"print()\">")
      .concat("<p class=\"bold\" style=\"font-size:90%\">").concat(this.entidade.nome).concat("</p>")
      .concat("<p class=\"bold\" style=\"font-size:85%\">").concat(this.getServico().secretaria.impressao.cabecalho).concat("</p>")
      .concat("<p class=\"bold\" style=\"font-size:80%\">").concat(this.getServico().departamento.nome).concat("</p>")
      .concat("<p>---</p>")
      .concat("<p>").concat(this.senha.servico.nome).concat("</p>")
      .concat("<p class=\"bold\">").concat(this.senha.prioridade.nome).concat("</p>")
      .concat("<p id=\"senha\" class=\"bold\">").concat(this.senha_codigo).concat("</p>")
      .concat("<p>").concat(this.getServico().mensagem).concat("</p>")
      .concat("<p>").concat(String(data.getDate())).concat("/").concat(String(data.getMonth() + 1)).concat("/").concat(String(data.getFullYear())).concat("</p>")
      .concat("<p>Horário de Chegada ").concat(String(data.getHours())).concat("h").concat(String(data.getMinutes() + 1)).concat("</p>")
      .concat("<p>( Horário Local )</p>")
      .concat("<p>").concat(this.getServico().secretaria.impressao.rodape).concat("</p>")
      .concat("</body></html>");

    var iframe = jQuery("#frame-impressao").get(0);
    iframe = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);
    iframe.document.open();
    iframe.document.write(html);
    iframe.document.close();



    var modal = window.open("data:text/html;charset=utf-8," + encodeURI(html), 'imprime-senha', 'height=1,width=1');
    console.log(html);
    console.log("data:text/html;charset=utf-8," + encodeURI(html));


    clearTimeout(Number(localStorage.getItem("totem.timeout")));
    localStorage.setItem("totem.timeout", "");
    setTimeout(() => {
      this.router.navigateByUrl("/secretaria");
    }, "5000");
  }

}
