import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAreaGrid } from './service-area-grid';

describe('ServiceAreaGrid', () => {
  let component: ServiceAreaGrid;
  let fixture: ComponentFixture<ServiceAreaGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceAreaGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAreaGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
