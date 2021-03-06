export enum Etat {nouveau, en_cours, fini}

export enum Importance {faible, moyen, urgent, critique}

export enum TypeIncident {panne, objet_perdu, nettoyage, achat}


export class IncidentModel {
    idincident: number;
    type: TypeIncident;
    auteur: string;
    destinataires: string[];
    localisation: string;
    etat: Etat;
    urgence: Importance;
    titre: string;
    description: string;
    date: Date;

}

/*

export class IncidentModel {
    idincident: number;
    titre: string;
    description: string;
    categorie: string;
    date: any;
    heure: any;
    destinataire: string;
    importance: number;
    localisation: string;
}

 */