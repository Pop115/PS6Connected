import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {HttpClient} from "@angular/common/http";

import {IncidentModel} from "../models/Incident";
import {URL_SERVER} from "../constants/urls";

@Injectable()
export class IncidentService {

    public incidentList: BehaviorSubject<IncidentModel[]>;

    private route = "/visualiser";

    constructor(private http: HttpClient) {
        this.incidentList = new BehaviorSubject([]);
    }

    getIncident() {
        this.http.get<IncidentModel[]>(URL_SERVER + this.route).subscribe((incidents) => this.incidentList.next(incidents));
    }

}
