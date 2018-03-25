import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {IncidentModel} from "../models/Incident";
import {URL_SERVER} from "../constants/urls";
import {Observable} from "rxjs/Observable";
import {tap, catchError} from "rxjs/operators";

@Injectable()
export class IncidentService {

    public incidentList: BehaviorSubject<IncidentModel[]>;

    private routeVue = "/incidents";
    private routeDeclaration = "/declaration";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
        this.incidentList = new BehaviorSubject([]);
    }

    getIncident() {
        this.http.get<IncidentModel[]>(URL_SERVER + this.routeVue).subscribe((incidents) => this.incidentList.next(incidents));
        console.log(this.incidentList);
    }

    /*
    addIncident(){
        console.log("AJOUT INCIDENT");
        var url = 'http://localhost:3000/declaration';
        var data = {title:"titre", description:"description"};
        this.http.post(url, data);
    }

    addIncident (incident: IncidentModel): Observable<IncidentModel> {
        return this.http.post<IncidentModel>(this.routeDeclaration, incident, this.httpOptions).pipe(
            tap((incident: IncidentModel) => this.log(`added incident w/ id=${incident.id}`)),
            catchError(this.handleError<IncidentModel>('addIncident'))
        );
    }
    */

}
