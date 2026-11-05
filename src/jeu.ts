import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];

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
    const annonce1 = ANNONCES[this.pointsJoueur1];
    if (this.pointsJoueur1 === 3 && this.pointsJoueur2 === 3) return "Égalité";
    // À égalité on annonce A sauf au début du jeu
    if (this.pointsJoueur1 === this.pointsJoueur2 && this.pointsJoueur1 > 0) {
      return `${annonce1}-A`;
    }
    return `${annonce1}-${ANNONCES[this.pointsJoueur2]}`;
  }
}
