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
  }

  deleteIncident(id:number){
      var url = "http://localhost:3000/suppression";
      var method = "POST";
      var postData = {};
      postData['idincident'] = id;
      console.log(postData);
      postData = JSON.stringify(postData);
      var shouldBeAsync = true;
      var request = new XMLHttpRequest();
      request.onload = function () {
          var status = request.status;
          var data = request.responseText;
      };
      request.open(method, url, shouldBeAsync);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(postData);

      this.incidentService.incidentList.subscribe(
          (incidentList) => this.incidentList = incidentList
      );
      this.incidentService.getIncident();
  }
}
