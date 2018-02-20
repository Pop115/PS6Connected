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
}
