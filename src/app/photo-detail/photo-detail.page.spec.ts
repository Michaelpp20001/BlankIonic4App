import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoDetailPage } from './photo-detail.page';

describe('PhotoDetailPage', () => {
  let component: PhotoDetailPage;
  let fixture: ComponentFixture<PhotoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
