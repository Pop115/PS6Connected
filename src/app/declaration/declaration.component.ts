import {Component, OnInit} from "@angular/core";
import {IncidentService} from "../shared/services/incident.service";
import {IncidentModel} from "../shared/models/Incident";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "app-declaration",
    templateUrl: "./declaration.component.html",
    styleUrls: ["./declaration.component.css"]
})


export class DeclarationComponent implements OnInit {

    constructor(private incidentService: IncidentService, private http: HttpClient) {
        this.incidentService = incidentService;
    }

    ngOnInit() {
        console.log("test");
    }


    addIncident() {
        var url = "http://localhost:3000/declaration";
        var method = "POST";
        var postData = '{"title":"UnTitle"}';
        var shouldBeAsync = true;
        var request = new XMLHttpRequest();

        request.onload = function () {
            var status = request.status;
            var data = request.responseText;
        };

        request.open(method, url, shouldBeAsync);

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        request.send(postData);

    }


}
