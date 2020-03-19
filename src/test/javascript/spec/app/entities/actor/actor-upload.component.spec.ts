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

    describe("Component methods", () => {
      it("Should call createAll service on save all", () => {
        //fakeAsync(
        // GIVEN
        const entityArray = [new Actor(), new Actor()];
        comp.dataList = entityArray;

        spyOn(service, "createAll").and.returnValue(
          of(new HttpResponse({ body: entityArray }))
        );
        // WHEN
        comp.saveAll();
        // tick(); // simulate async

        // THEN
        // expect(service.create).toHaveBeenCalledWith(entity);
        expect(service.createAll).toHaveBeenCalled();
        expect(comp.actors && comp.actors[0]).toEqual(new Actor());
        expect(comp.isSaving).toEqual(false);
      });
      //)
    });
  });
});
