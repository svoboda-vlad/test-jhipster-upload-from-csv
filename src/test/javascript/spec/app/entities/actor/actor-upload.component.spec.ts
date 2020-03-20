import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
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
        expect(service.createAll).toHaveBeenCalled();
        expect(comp.actors && comp.actors[0]).toEqual(new Actor());
        expect(comp.isSaving).toEqual(false);
      });
      
      it("Should populate dataList when parsing file", () => {
        const parsedFile = 'name;birthDate;height\nAAAA;"2000-01-01";1\nBBBB;"2000-02-02";2';
        const expected = [
          { name: "AAAA", birthDate: "2000-01-01", height: 1 },
          { name: "BBBB", birthDate: "2000-02-02", height: 2 }
        ];
        comp.parseCsvFile(parsedFile);
        expect(comp.dataList).toEqual(expected);
      });
            
    });
  });
});
