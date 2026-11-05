import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze"];

export class Jeu {
  private pointsJoueur1 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    this.pointsJoueur1++;
  }

  score(): string {
    return `${ANNONCES[this.pointsJoueur1]}-Zéro`;
  }
}
