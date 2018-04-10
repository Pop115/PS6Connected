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
import {UserService} from "./shared/services/user.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ParametresComponent} from "./parametres/parametres.component";
import { PageChoixTypeComponent } from "./page-choix-type/page-choix-type.component";

@NgModule({
    declarations: [
        AppComponent,
        IncidentListComponent,
        LoginComponent,
        ChooseUserComponent,
        DeclarationComponent,
        ParametresComponent,
        PageChoixTypeComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    providers: [IncidentService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
