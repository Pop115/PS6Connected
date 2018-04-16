import {Component, OnInit} from "@angular/core";
import {UserModel} from "../shared/models/User";
import {UserService} from "../shared/services/user.service";

@Component({
    selector: "app-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
    public user: UserModel;

    constructor(private userService: UserService) {
        // this.userService.user.subscribe((user) => this.user = user);
        console.log(this.user);
        this.userService.getUserById(parseInt(localStorage.getItem("idpersonne"), 10));

    }

    ngOnInit() {
    }

}
