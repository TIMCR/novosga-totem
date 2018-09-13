import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimindoComponent } from './imprimindo.component';

describe('ImprimindoComponent', () => {
  let component: ImprimindoComponent;
  let fixture: ComponentFixture<ImprimindoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimindoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimindoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
