import {RouterModule, Routes} from "@angular/router";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {LoginComponent} from "./login/login.component";
import {ChooseUserComponent} from "./chooseUser/chooseUser.component";
import {DeclarationComponent} from "./declaration/declaration.component";
import {ParametresComponent} from "./parametres/parametres.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {PageChoixTypeComponent} from "./page-choix-type/page-choix-type.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "chooseUser", component: ChooseUserComponent},
    {path: "incidents", component: IncidentListComponent},
    {path: "declaration", component: DeclarationComponent},
    {path: "parametres", component: ParametresComponent},
    {path: "edit", component: EditUserComponent},
    {path: "page-choix-type", component: PageChoixTypeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes {
}
