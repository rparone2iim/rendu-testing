import { describe, it, expect } from "vitest";
import { Match } from "../src/match";
import type { Classement } from "../src/classement";

// Dummy car le constructeur exige un classement mais ces tests ne vérifient que le score
// Pas de spy ni de mock car aucun appel au classement n'est vérifié ici
const classementInutile: Classement = { enregistrer: () => {} };

function nouveauMatch() {
  return new Match("Alice", "Bob", classementInutile);
}

function marquer(match: Match, joueur: string, nombre: number) {
  for (let i = 0; i < nombre; i++) match.pointPour(joueur);
}

function gagnerJeux(match: Match, joueur: string, nombre: number) {
  marquer(match, joueur, nombre * 4);
}

describe("Le match en un set", () => {
  it("un match commence sans jeu gagné et à Zéro-Zéro", () => {
    const match = nouveauMatch();
    expect(match.jeuxGagnes("Alice")).toBe(0);
    expect(match.jeuxGagnes("Bob")).toBe(0);
    expect(match.score()).toBe("Zéro-Zéro");
  });

  it("un jeu gagné compte pour son vainqueur et le suivant repart à zéro", () => {
    const match = nouveauMatch();
    marquer(match, "Bob", 4);
    marquer(match, "Alice", 1);
    expect(match.jeuxGagnes("Bob")).toBe(1);
    expect(match.jeuxGagnes("Alice")).toBe(0);
    expect(match.score()).toBe("Quinze-Zéro");
  });

  it("le premier à quatre jeux gagne le match sans écart de deux jeux", () => {
    const match = nouveauMatch();
    gagnerJeux(match, "Alice", 3);
    gagnerJeux(match, "Bob", 4);
    expect(match.score()).toBe("Victoire Bob 4-3");
  });
});
