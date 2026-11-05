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
    // Après la victoire les points ne comptent plus
    if (this.vainqueur()) return;

    if (joueur === this.joueur1) this.pointsJoueur1++;
    else this.pointsJoueur2++;

    const vainqueur = this.vainqueur();
    if (vainqueur) this.classement.enregistrer(vainqueur, this.adversaire(vainqueur));
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) return `Victoire ${vainqueur}`;

    const annonce1 = ANNONCES[this.pointsJoueur1];
    const pointsEgaux = this.pointsJoueur1 === this.pointsJoueur2;

    if (pointsEgaux && this.pointsJoueur1 === QUARANTE) return "Égalité";
    // Points égaux en cours de jeu donc le second score s'annonce A
    if (pointsEgaux && this.pointsJoueur1 > 0) return `${annonce1}-A`;
    return `${annonce1}-${ANNONCES[this.pointsJoueur2]}`;
  }

  private vainqueur(): string | undefined {
    if (this.pointsJoueur1 > QUARANTE) return this.joueur1;
    if (this.pointsJoueur2 > QUARANTE) return this.joueur2;
    return undefined;
  }

  private adversaire(joueur: string): string {
    return joueur === this.joueur1 ? this.joueur2 : this.joueur1;
  }
}
