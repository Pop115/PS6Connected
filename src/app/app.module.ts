import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {routes} from "./routes";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {IncidentService} from "./shared/services/incident.service";

@NgModule({
  declarations: [
    AppComponent,
    IncidentListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [IncidentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
