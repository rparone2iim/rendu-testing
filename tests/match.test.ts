import { describe, it, expect } from "vitest";
import { Match } from "../src/match";
import type { Classement } from "../src/classement";

// Dummy car le constructeur exige un classement mais ces tests ne vérifient que le score
// Pas de spy ni de mock car aucun appel au classement n'est vérifié ici
const classementInutile: Classement = { enregistrer: () => {} };

function nouveauMatch() {
  return new Match("Alice", "Bob", classementInutile);
}

describe("Le match en un set", () => {
  it("un match commence sans jeu gagné et à Zéro-Zéro", () => {
    const match = nouveauMatch();
    expect(match.jeuxGagnes("Alice")).toBe(0);
    expect(match.jeuxGagnes("Bob")).toBe(0);
    expect(match.score()).toBe("Zéro-Zéro");
  });
});
