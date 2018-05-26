import {Component, OnInit} from "@angular/core";

@Component({
    selector: "parametres",
    templateUrl: "./parametres.component.html",
    styleUrls: ["./parametres.component.css"]
})

export class ParametresComponent implements OnInit {

    ngOnInit() {
    }

    getUser() {
        console.log(parseInt(localStorage.getItem("idpersonne"), 10));
    }

}
