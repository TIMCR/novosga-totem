import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesComponent } from './configuracoes.component';

describe('ConfiguracoesComponent', () => {
  let component: ConfiguracoesComponent;
  let fixture: ComponentFixture<ConfiguracoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
