import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acessoriosdetails } from './acessoriosdetails';

describe('Acessoriosdetails', () => {
  let component: Acessoriosdetails;
  let fixture: ComponentFixture<Acessoriosdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acessoriosdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acessoriosdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
