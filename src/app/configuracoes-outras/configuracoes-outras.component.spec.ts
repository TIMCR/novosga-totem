import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesOutrasComponent } from './configuracoes-outras.component';

describe('ConfiguracoesOutrasComponent', () => {
  let component: ConfiguracoesOutrasComponent;
  let fixture: ComponentFixture<ConfiguracoesOutrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracoesOutrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracoesOutrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
