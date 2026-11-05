import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];
const QUARANTE = 3;

export class Jeu {
  private pointsJoueur1 = 0;
  private pointsJoueur2 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    if (joueur === this.joueur1) this.pointsJoueur1++;
    else this.pointsJoueur2++;
  }

  score(): string {
    if (this.pointsJoueur1 > QUARANTE) return `Victoire ${this.joueur1}`;
    if (this.pointsJoueur2 > QUARANTE) return `Victoire ${this.joueur2}`;

    const annonce1 = ANNONCES[this.pointsJoueur1];
    const pointsEgaux = this.pointsJoueur1 === this.pointsJoueur2;

    if (pointsEgaux && this.pointsJoueur1 === QUARANTE) return "Égalité";
    // Points égaux en cours de jeu donc le second score s'annonce A
    if (pointsEgaux && this.pointsJoueur1 > 0) return `${annonce1}-A`;
    return `${annonce1}-${ANNONCES[this.pointsJoueur2]}`;
  }
}
