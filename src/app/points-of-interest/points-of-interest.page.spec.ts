import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PointsOfInterestPage } from './points-of-interest.page';

describe('PointsOfInterestPage', () => {
  let component: PointsOfInterestPage;
  let fixture: ComponentFixture<PointsOfInterestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsOfInterestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PointsOfInterestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
