import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { JhipsterDemoTestModule } from '../../../test.module';
import { ActorUploadComponent } from 'app/entities/actor/actor-upload.component';
import { ActorService } from 'app/entities/actor/actor.service';
import { Actor } from 'app/shared/model/actor.model';

describe('Component Tests', () => {
  describe('Actor Management Upload Component', () => {
    let comp: ActorUploadComponent;
    let fixture: ComponentFixture<ActorUploadComponent>;
    let service: ActorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterDemoTestModule],
        declarations: [ActorUploadComponent]
      })
        .overrideTemplate(ActorUploadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActorUploadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActorService);
    });

    describe('save', () => {

    });
  });
});
