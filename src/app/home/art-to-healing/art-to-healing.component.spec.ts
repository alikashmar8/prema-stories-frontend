import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtToHealingComponent } from './art-to-healing.component';

describe('ArtToHealingComponent', () => {
  let component: ArtToHealingComponent;
  let fixture: ComponentFixture<ArtToHealingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtToHealingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtToHealingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
