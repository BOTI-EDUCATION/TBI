import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RessourcePage } from './ressource.page';

describe('RessourcePage', () => {
  let component: RessourcePage;
  let fixture: ComponentFixture<RessourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RessourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
