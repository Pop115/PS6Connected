import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {routes} from "./routes";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {IncidentService} from "./shared/services/incident.service";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {ChooseUserComponent} from "./chooseUser/chooseUser.component";
import {DeclarationComponent} from "./declaration/declaration.component";

@NgModule({
    declarations: [
        AppComponent,
        IncidentListComponent,
        LoginComponent,
        ChooseUserComponent,
        DeclarationComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        FormsModule
    ],
    providers: [IncidentService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
