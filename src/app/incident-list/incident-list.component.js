"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IncidentListComponent = /** @class */ (function () {
    function IncidentListComponent(incidentService) {
        var _this = this;
        this.incidentService = incidentService;
        this.incidentList = [];
        this.incidentService.incidentList.subscribe(function (incidentList) { return _this.incidentList = incidentList; });
        this.incidentService.getIncident();
    }
    IncidentListComponent.prototype.ngOnInit = function () {
        console.log(localStorage.getItem('idpersonne'));
    };
    IncidentListComponent.prototype.deleteIncident = function (id) {
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
        this.incidentList = this.incidentList.filter(function (incident) { return incident.idincident !== id; });
    };
    IncidentListComponent = __decorate([
        core_1.Component({
            selector: "app-incident-list",
            templateUrl: "./incident-list.component.html",
            styleUrls: ["./incident-list.component.css"]
        })
    ], IncidentListComponent);
    return IncidentListComponent;
}());
exports.IncidentListComponent = IncidentListComponent;
