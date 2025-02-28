import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBimestreComponent } from './create-bimestre.component';

describe('CreateBimestreComponent', () => {
  let component: CreateBimestreComponent;
  let fixture: ComponentFixture<CreateBimestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBimestreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
