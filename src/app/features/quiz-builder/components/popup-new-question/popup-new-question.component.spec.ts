import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewQuestionComponent } from './popup-new-question.component';

describe('PopupNewQuestionComponent', () => {
  let component: PopupNewQuestionComponent;
  let fixture: ComponentFixture<PopupNewQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PopupNewQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupNewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
