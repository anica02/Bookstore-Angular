import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoookCreateComponent } from './boook-create.component';

describe('BoookCreateComponent', () => {
  let component: BoookCreateComponent;
  let fixture: ComponentFixture<BoookCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoookCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
