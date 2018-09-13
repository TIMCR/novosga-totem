import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css']
})
export class SecretariaComponent implements OnInit {

  secretarias: Object[] = [];
  constructor() {
    this.secretarias = JSON.parse(localStorage.getItem("totem.secretarias_completo"));
  }

  ngOnInit() {
  }

}
