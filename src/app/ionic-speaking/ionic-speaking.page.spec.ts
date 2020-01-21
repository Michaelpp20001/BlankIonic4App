import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicSpeakingPage } from './ionic-speaking.page';

describe('IonicSpeakingPage', () => {
  let component: IonicSpeakingPage;
  let fixture: ComponentFixture<IonicSpeakingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicSpeakingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicSpeakingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
