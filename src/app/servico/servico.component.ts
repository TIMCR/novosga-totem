import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {

  servicos = [];
  private id;
  private timeout;
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.servicos = JSON.parse(localStorage.getItem("totem.servicos_selecionados"));

    this.timeout = setTimeout(() => {
      localStorage.setItem("totem.timeout", "");
      this.router.navigateByUrl("/secretaria");
    }, "30000");
    localStorage.setItem("totem.timeout",this.timeout);
  }

}
