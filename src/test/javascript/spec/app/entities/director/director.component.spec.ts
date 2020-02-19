import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterDemoTestModule } from '../../../test.module';
import { DirectorComponent } from 'app/entities/director/director.component';
import { DirectorService } from 'app/entities/director/director.service';
import { Director } from 'app/shared/model/director.model';

describe('Component Tests', () => {
  describe('Director Management Component', () => {
    let comp: DirectorComponent;
    let fixture: ComponentFixture<DirectorComponent>;
    let service: DirectorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterDemoTestModule],
        declarations: [DirectorComponent]
      })
        .overrideTemplate(DirectorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DirectorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DirectorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Director(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.directors && comp.directors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
