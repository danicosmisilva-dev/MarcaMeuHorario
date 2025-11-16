import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArea } from './category-area';

describe('CategoryArea', () => {
  let component: CategoryArea;
  let fixture: ComponentFixture<CategoryArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
