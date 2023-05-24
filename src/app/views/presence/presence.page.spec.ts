import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresencePage } from './presence.page';

describe('PresencePage', () => {
  let component: PresencePage;
  let fixture: ComponentFixture<PresencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
