import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricanteFormComponent } from './fabricante-form.component';

describe('FabricanteFormComponent', () => {
  let component: FabricanteFormComponent;
  let fixture: ComponentFixture<FabricanteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricanteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricanteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
