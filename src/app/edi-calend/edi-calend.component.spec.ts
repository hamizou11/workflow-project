import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiCalendComponent } from './edi-calend.component';

describe('EdiCalendComponent', () => {
  let component: EdiCalendComponent;
  let fixture: ComponentFixture<EdiCalendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdiCalendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdiCalendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
