import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { ServicoComponent } from './servico/servico.component';
import { TipoAtendimentoComponent } from './tipo-atendimento/tipo-atendimento.component';
import { TipoPrioridadeComponent } from './tipo-prioridade/tipo-prioridade.component';
import { ImprimindoComponent } from './imprimindo/imprimindo.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ConfiguracoesServidorComponent } from './configuracoes-servidor/configuracoes-servidor.component';
import { ConfiguracoesSecretariasComponent } from './configuracoes-secretarias/configuracoes-secretarias.component';
import { ConfiguracoesOutrasComponent } from './configuracoes-outras/configuracoes-outras.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecretariaComponent,
    ServicoComponent,
    TipoAtendimentoComponent,
    TipoPrioridadeComponent,
    ImprimindoComponent,
    ConfiguracoesComponent,
    ConfiguracoesServidorComponent,
    ConfiguracoesSecretariasComponent,
    ConfiguracoesOutrasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
