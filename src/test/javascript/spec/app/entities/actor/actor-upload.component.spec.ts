import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { JhipsterDemoTestModule } from '../../../test.module';
import { ActorUploadComponent } from 'app/entities/actor/actor-upload.component';
import { ActorService } from 'app/entities/actor/actor.service';
import { Actor } from 'app/shared/model/actor.model';

interface MockFile {
  name: string;
  body: string;
  mimeType: string;
}

const createFileFromMockFile = (file: MockFile): File => {
  const blob = new Blob([file.body], { type: file.mimeType }) as any;
  blob["lastModifiedDate"] = new Date();
  blob["name"] = file.name;
  return blob as File;
};

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
      it("Should populate dataList when parsing file", fakeAsync(() => {
        const expected = [
          { name: "AAAA", birthDate: "2000-01-01", height: 1 },
          { name: "BBBB", birthDate: "2000-02-02", height: 2 }
        ];
        const parsedFile = createFileFromMockFile({
          body: "name;birthDate;height\\nAAAA;\"2000-01-01\";1\\nBBBB;\"2000-02-02\";2",
          mimeType: "text/csv",
          name: "test.csv"
        });
        comp.parseCsvFile(parsedFile);
        tick();
        expect(comp.dataList).toEqual(expected);
      }));      
    });
  });
});
