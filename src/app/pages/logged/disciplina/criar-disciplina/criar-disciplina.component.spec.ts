import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDisciplinaComponent } from './criar-disciplina.component';

describe('CriarDisciplinaComponent', () => {
  let component: CriarDisciplinaComponent;
  let fixture: ComponentFixture<CriarDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarDisciplinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
