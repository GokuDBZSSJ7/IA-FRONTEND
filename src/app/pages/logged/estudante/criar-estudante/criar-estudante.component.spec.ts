import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEstudanteComponent } from './criar-estudante.component';

describe('CriarEstudanteComponent', () => {
  let component: CriarEstudanteComponent;
  let fixture: ComponentFixture<CriarEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarEstudanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
