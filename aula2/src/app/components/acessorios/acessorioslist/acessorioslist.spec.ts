import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acessorioslist } from './acessorioslist';

describe('Acessorioslist', () => {
  let component: Acessorioslist;
  let fixture: ComponentFixture<Acessorioslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acessorioslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acessorioslist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
