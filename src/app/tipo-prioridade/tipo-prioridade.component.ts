import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipo-prioridade',
  templateUrl: './tipo-prioridade.component.html',
  styleUrls: ['./tipo-prioridade.component.css']
})
export class TipoPrioridadeComponent implements OnInit {

  id;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

}
