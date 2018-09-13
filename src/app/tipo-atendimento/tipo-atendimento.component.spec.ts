import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAtendimentoComponent } from './tipo-atendimento.component';

describe('TipoAtendimentoComponent', () => {
  let component: TipoAtendimentoComponent;
  let fixture: ComponentFixture<TipoAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAtendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
