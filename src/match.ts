import type { Classement } from "./classement";
import { Jeu } from "./jeu";

const JEUX_POUR_GAGNER = 4;

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
    // Après la victoire les points ne comptent plus
    if (this.vainqueur()) return;
    this.jeuEnCours.pointPour(joueur);
  }

  jeuxGagnes(joueur: string): number {
    return joueur === this.joueur1 ? this.jeuxJoueur1 : this.jeuxJoueur2;
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const perdant = this.adversaire(vainqueur);
      return `Victoire ${vainqueur} ${this.jeuxGagnes(vainqueur)}-${this.jeuxGagnes(perdant)}`;
    }
    return this.jeuEnCours.score();
  }

  private vainqueur(): string | undefined {
    if (this.jeuxJoueur1 === JEUX_POUR_GAGNER) return this.joueur1;
    if (this.jeuxJoueur2 === JEUX_POUR_GAGNER) return this.joueur2;
    return undefined;
  }

  private adversaire(joueur: string): string {
    return joueur === this.joueur1 ? this.joueur2 : this.joueur1;
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

    const vainqueurMatch = this.vainqueur();
    if (vainqueurMatch) this.classement.enregistrer(vainqueurMatch, this.adversaire(vainqueurMatch));
  }
}
