import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetardPage } from './retard.page';

describe('RetardPage', () => {
  let component: RetardPage;
  let fixture: ComponentFixture<RetardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
