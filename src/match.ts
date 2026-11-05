import type { Classement } from "./classement";
import { Jeu } from "./jeu";

export class Match {
  private jeuxJoueur1 = 0;
  private jeuxJoueur2 = 0;
  private jeuEnCours: Jeu;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {
    this.jeuEnCours = this.nouveauJeu();
  }

  pointPour(joueur: string): void {
    this.jeuEnCours.pointPour(joueur);
  }

  jeuxGagnes(joueur: string): number {
    return joueur === this.joueur1 ? this.jeuxJoueur1 : this.jeuxJoueur2;
  }

  score(): string {
    return this.jeuEnCours.score();
  }

  private nouveauJeu(): Jeu {
    // Le jeu signale son vainqueur au match et pas au tournoi
    return new Jeu(this.joueur1, this.joueur2, {
      enregistrer: (vainqueur) => this.jeuGagne(vainqueur),
    });
  }

  private jeuGagne(vainqueur: string): void {
    if (vainqueur === this.joueur1) this.jeuxJoueur1++;
    else this.jeuxJoueur2++;
    this.jeuEnCours = this.nouveauJeu();
  }
}
