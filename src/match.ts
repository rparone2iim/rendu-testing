import type { Classement } from "./classement";

export class Match {
  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  jeuxGagnes(joueur: string): number {
    return 0;
  }

  score(): string {
    return "Zéro-Zéro";
  }
}
