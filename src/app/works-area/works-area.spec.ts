import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksArea } from './works-area';

describe('WorksArea', () => {
  let component: WorksArea;
  let fixture: ComponentFixture<WorksArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorksArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
