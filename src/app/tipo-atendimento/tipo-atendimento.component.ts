import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipo-atendimento',
  templateUrl: './tipo-atendimento.component.html',
  styleUrls: ['./tipo-atendimento.component.css']
})
export class TipoAtendimentoComponent implements OnInit {

  id;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

}
