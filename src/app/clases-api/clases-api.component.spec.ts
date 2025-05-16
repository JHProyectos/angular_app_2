import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesApiComponent } from './clases-api.component';

describe('ClasesApiComponent', () => {
  let component: ClasesApiComponent;
  let fixture: ComponentFixture<ClasesApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasesApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasesApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
