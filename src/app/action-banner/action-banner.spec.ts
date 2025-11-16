import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBanner } from './action-banner';

describe('ActionBanner', () => {
  let component: ActionBanner;
  let fixture: ComponentFixture<ActionBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
