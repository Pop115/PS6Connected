import {Routes} from "@angular/router";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {LoginComponent} from "./login/login.component";
import {ChooseUserComponent} from "./chooseUser/chooseUser.component";

export const routes: Routes = [
  {path: "", component: LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"chooseUser", component:ChooseUserComponent},
  {path: "incidents", component: IncidentListComponent},
];
