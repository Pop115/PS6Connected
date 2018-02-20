export enum Etat {nouveau, en_cours, fini}
export enum Importance {faible, moyen, urgent, critique}
export enum TypeIncident {panne, objet_perdu, nettoyage, achat}

export class Incident {

    id: number;
    type: TypeIncident;
    auteur: string;
    destinataires: Array<string>;
    localisation:string;
    etat: Etat;
    importance: Importance;
    titre: string;
    description: string;
    date: Date;

}
