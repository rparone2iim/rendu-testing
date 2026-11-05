import { describe, it, expect, vi } from "vitest";
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

describe("Le classement du match", () => {
  // Spy car on vérifie après coup les appels reçus par le classement
  // Pas de mock car vi.fn suffit et pas de fake car on ne stocke aucun résultat
  it("le classement enregistre le match une seule fois et pas chaque jeu", () => {
    const classement = { enregistrer: vi.fn() };
    const match = new Match("Alice", "Bob", classement);
    gagnerJeux(match, "Alice", 2);
    gagnerJeux(match, "Bob", 4);
    gagnerJeux(match, "Bob", 1);
    expect(classement.enregistrer).toHaveBeenCalledTimes(1);
    expect(classement.enregistrer).toHaveBeenCalledWith("Bob", "Alice");
  });
});
