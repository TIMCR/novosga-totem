import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesSecretariasComponent } from './configuracoes-secretarias.component';

describe('ConfiguracoesSecretariasComponent', () => {
  let component: ConfiguracoesSecretariasComponent;
  let fixture: ComponentFixture<ConfiguracoesSecretariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracoesSecretariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracoesSecretariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
