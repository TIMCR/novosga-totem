import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SecretariaComponent } from './secretaria/secretaria.component';
import { ServicoComponent } from './servico/servico.component';
import { TipoAtendimentoComponent } from './tipo-atendimento/tipo-atendimento.component';
import { TipoPrioridadeComponent } from './tipo-prioridade/tipo-prioridade.component';
import { ImprimindoComponent } from './imprimindo/imprimindo.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ConfiguracoesServidorComponent } from './configuracoes-servidor/configuracoes-servidor.component';
import { ConfiguracoesSecretariasComponent } from './configuracoes-secretarias/configuracoes-secretarias.component';
import { ConfiguracoesOutrasComponent } from './configuracoes-outras/configuracoes-outras.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'secretaria', component: SecretariaComponent },
  { path: 'servico/:id', component: ServicoComponent },
  { path: 'tipoatendimento/:id', component: TipoAtendimentoComponent },
  { path: 'prioridade/:id', component: TipoPrioridadeComponent },
  { path: 'imprimindo/:id/:prioridade', component: ImprimindoComponent },
  { path: 'configuracao', component: ConfiguracoesComponent },
  { path: 'configuracao/servidor', component: ConfiguracoesServidorComponent },
  { path: 'configuracao/secretaria', component: ConfiguracoesSecretariasComponent },
  { path: 'configuracao/outras', component: ConfiguracoesOutrasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
