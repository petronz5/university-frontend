import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfRegisterComponent } from './prof-register.component';

describe('ProfRegisterComponent', () => {
  let component: ProfRegisterComponent;
  let fixture: ComponentFixture<ProfRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
