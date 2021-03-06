import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SharedModule } from './common/shared/shared.module';
import { ACLTreeComponent } from './components/acl-tree/acl-tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { AclComponent } from './components/acl/acl.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AclListComponent } from './components/acl-list/acl-list.component';
import { AclService } from './common/service/acl.service';
import { FunctionalitiesService } from './common/service/functionalities.service';

@NgModule({
  entryComponents: [AclComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ACLTreeComponent,
    AutocompleteComponent,
    AclComponent,
    AclListComponent,
  ],
  providers: [AclService, FunctionalitiesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
