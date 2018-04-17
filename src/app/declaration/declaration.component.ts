import {Component, OnInit} from "@angular/core";
import {IncidentService} from "../shared/services/incident.service";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../shared/models/User";
import {UserService} from "../shared/services/user.service";
import {FormArray, FormControl} from "@angular/forms";


@Component({
    selector: "app-declaration",
    templateUrl: "./declaration.component.html",
    styleUrls: ["./declaration.component.css"]
})


export class DeclarationComponent implements OnInit {

    public userList: UserModel[] = [];
    public destinataires: string[] = [];

    constructor(private incidentService: IncidentService, private http: HttpClient, private userService: UserService) {
        this.incidentService = incidentService;

        this.userService.getUsers().subscribe(
            (userList) => this.userList = userList
        );


    }

    ngOnInit() {

    }

    clearForm(){
        $("#formulaire").find("input, textarea").val("");
        $("#modalDeclaration").modal("hide");
    }

    onChange(personne:string, isChecked: boolean) {

        if(isChecked) {
            this.destinataires.push(personne);
        } else {
            let index = this.destinataires.findIndex(x => x == personne)
            this.destinataires.splice(index,1);
        }
    }


    addIncident(titre: string, description: string, categorie: string, date, heure, importance: number, localisation: string) {
        console.log(this.destinataires);

		if (titre == "") {
			$("#titre_incident").css("background-color", "#fff");
		}

		else if (description == "") {
			$("#description_incident").css("background-color", "#fff");
		}

		else {
		    const url = "http://localhost:3000/declaration";
		    const method = "POST";
		    let postData = {};
		    postData["titre"] = titre;
		    postData["description"] = description;
		    postData["categorie"] = categorie;
		    postData["date"] = date;
		    postData["heure"] = heure;
		    postData["destinataires"] = this.destinataires;
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


}
