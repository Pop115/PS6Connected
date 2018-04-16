import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {IncidentModel} from "../models/Incident";
import {URL_SERVER} from "../constants/urls";
import {Observable} from "rxjs/Observable";

@Injectable()
export class IncidentService {

    public incidentList: BehaviorSubject<IncidentModel[]>;
    public allocationsList: BehaviorSubject<Object[]>;

    private routeVue = "/incidents";
    private routeDeclaration = "/declaration";
    private routeAllocations = "/allocations";

    httpOptions = {
        headers: new HttpHeaders({"Content-Type": "application/json"})
    };

    constructor(private http: HttpClient) {
        this.incidentList = new BehaviorSubject([]);
        this.allocationsList = new BehaviorSubject([]);
    }

    getIncident() {
        this.http.get<IncidentModel[]>(URL_SERVER + this.routeVue).subscribe((incidents) => {
            if (incidents != null && incidents != []) {
                /*
                console.log("---------------------------------------------------")
                console.log(incidents);
                for (let incident of incidents) {
                    console.log(incident);
                    console.log(incident["idincident"]);
                    incident.destinataires = this.getAllocations(incident["idincident"]);
                }
                */
            }
            this.incidentList.next(incidents);
        });
        console.log(this.incidentList);
    }

    getAllocationsPost(idincident: number) {
        //this.http.post<any[]>(URL_SERVER + this.routeAllocations, '{"idincident":' + idincident + '}', this.httpOptions).subscribe((allocations) => this.allocationsList.push(allocations));
        //console.log(this.allocationsList);
    }

    getAllocationsGet(){
        this.http.get<Object[]>(URL_SERVER + this.routeAllocations).subscribe((allocations) => this.allocationsList.next(allocations));
        console.log(this.allocationsList);
    }


    addIncident(incident: IncidentModel): Observable<IncidentModel> {
        return this.http.post<IncidentModel>(this.routeDeclaration, incident, this.httpOptions);
    }


}
