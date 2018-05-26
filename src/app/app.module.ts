import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from "./app.component";
import {AppRoutes} from "./app-routes";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {IncidentService} from "./shared/services/incident.service";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {ChooseUserComponent} from "./chooseUser/chooseUser.component";
import {DeclarationComponent} from "./declaration/declaration.component";
import {UserService} from "./shared/services/user.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ParametresComponent} from "./parametres/parametres.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {PageChoixTypeComponent} from "./page-choix-type/page-choix-type.component";

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import {StatistiquesComponent} from "./statistiques/statistiques.component";

@NgModule({
    declarations: [
        AppComponent,
        IncidentListComponent,
        LoginComponent,
        ChooseUserComponent,
        DeclarationComponent,
        ParametresComponent,
        EditUserComponent,
        PageChoixTypeComponent,
        StatistiquesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutes,
        HttpClientModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    providers: [IncidentService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
