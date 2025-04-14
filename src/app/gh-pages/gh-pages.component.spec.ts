import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhPagesComponent } from './gh-pages.component';

describe('GhPagesComponent', () => {
  let component: GhPagesComponent;
  let fixture: ComponentFixture<GhPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
