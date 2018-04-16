import {Component, OnInit} from "@angular/core";
import {IncidentModel} from "../shared/models/Incident";
import {IncidentService} from "../shared/services/incident.service";

@Component({
    selector: "app-incident-list",
    templateUrl: "./incident-list.component.html",
    styleUrls: ["./incident-list.component.css"]
})
export class IncidentListComponent implements OnInit {

    public incidentList: IncidentModel[] = [];

    constructor(private incidentService: IncidentService) {
        this.incidentService.incidentList.subscribe(
            (incidentList) => this.incidentList = incidentList
        );
        this.incidentService.getIncident();
    }

    ngOnInit() {
        console.log(localStorage.getItem("idpersonne"));
    }

    deleteIncident(id: number) {
        const url = "http://localhost:3000/suppression";
        const method = "POST";
        let postData = {};
        postData["idincident"] = id;
        console.log(postData);
        postData = JSON.stringify(postData);
        const shouldBeAsync = true;
        const request = new XMLHttpRequest();
        request.onload = function () {
            const status = request.status;
            const data = request.responseText;
        };
        request.open(method, url, shouldBeAsync);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(postData);

        this.incidentList = this.incidentList.filter(incident => incident.idincident !== id);


    }
}
