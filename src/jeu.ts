import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente"];

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
    return `${ANNONCES[this.pointsJoueur1]}-${ANNONCES[this.pointsJoueur2]}`;
  }
}
