import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosdosComponent } from './preguntadosdos.component';

describe('PreguntadosdosComponent', () => {
  let component: PreguntadosdosComponent;
  let fixture: ComponentFixture<PreguntadosdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreguntadosdosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntadosdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
