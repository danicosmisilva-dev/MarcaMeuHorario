import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArea } from './home-area';

describe('HomeArea', () => {
  let component: HomeArea;
  let fixture: ComponentFixture<HomeArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
