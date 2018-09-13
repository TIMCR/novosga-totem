import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaComponent } from './secretaria.component';

describe('SecretariaComponent', () => {
  let component: SecretariaComponent;
  let fixture: ComponentFixture<SecretariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
