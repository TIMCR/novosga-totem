import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPrioridadeComponent } from './tipo-prioridade.component';

describe('TipoPrioridadeComponent', () => {
  let component: TipoPrioridadeComponent;
  let fixture: ComponentFixture<TipoPrioridadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPrioridadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPrioridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
