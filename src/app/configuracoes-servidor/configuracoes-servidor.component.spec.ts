import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesServidorComponent } from './configuracoes-servidor.component';

describe('ConfiguracoesServidorComponent', () => {
  let component: ConfiguracoesServidorComponent;
  let fixture: ComponentFixture<ConfiguracoesServidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracoesServidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracoesServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
