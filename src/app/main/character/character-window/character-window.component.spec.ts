import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterWindowComponent } from './character-window.component';

describe('CharacterWindowComponent', () => {
  let component: CharacterWindowComponent;
  let fixture: ComponentFixture<CharacterWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
