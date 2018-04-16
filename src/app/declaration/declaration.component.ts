import {Component, OnInit} from "@angular/core";
import {IncidentService} from "../shared/services/incident.service";
import {HttpClient} from "@angular/common/http";


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

    }

    clearForm(){
        $("#formulaire").find("input, textarea").val("");
        $("#modalDeclaration").modal("hide");
    }

    addIncident(titre: string, description: string, categorie: string, date, heure, destinataire: string, importance: number, localisation: string) {


        const url = "http://localhost:3000/declaration";
        const method = "POST";
        let postData = {};
        postData["titre"] = titre;
        postData["description"] = description;
        postData["categorie"] = categorie;
        postData["date"] = date;
        postData["heure"] = heure;
        postData["destinataire"] = destinataire;
        postData["urgence"] = importance;
        postData["localisation"] = localisation;
        postData["idauteur"] = parseInt(localStorage.getItem("idpersonne"), 10);
        console.log(postData);
        postData = JSON.stringify(postData);
        const shouldBeAsync = true;
        const request = new XMLHttpRequest();

        request.onload = function () {
            const status = request.status;
            const data = request.responseText;
            console.log(status);
            if(status == 200)
                $("#modalDeclaration").modal("show");
            else
                $("#modalError").modal("show");
        };

        request.open(method, url, shouldBeAsync);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(postData);

    }


}
