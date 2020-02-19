import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDemoSharedModule } from 'app/shared/shared.module';
import { DirectorComponent } from './director.component';
import { DirectorDetailComponent } from './director-detail.component';
import { DirectorUpdateComponent } from './director-update.component';
import { DirectorDeleteDialogComponent } from './director-delete-dialog.component';
import { directorRoute } from './director.route';

@NgModule({
  imports: [JhipsterDemoSharedModule, RouterModule.forChild(directorRoute)],
  declarations: [DirectorComponent, DirectorDetailComponent, DirectorUpdateComponent, DirectorDeleteDialogComponent],
  entryComponents: [DirectorDeleteDialogComponent]
})
export class JhipsterDemoDirectorModule {}
