import { describe, it, expect } from "vitest";
import { Jeu } from "../src/jeu";
import type { Classement } from "../src/classement";

// Dummy car le constructeur exige un classement mais ces tests ne vérifient que le score
const classementInutile: Classement = { enregistrer: () => {} };

function nouveauJeu() {
  return new Jeu("Alice", "Bob", classementInutile);
}

describe("Les points", () => {
  it("un jeu commence à Zéro-Zéro", () => {
    expect(nouveauJeu().score()).toBe("Zéro-Zéro");
  });

  it("un premier point vaut Quinze", () => {
    const jeu = nouveauJeu();
    jeu.pointPour("Alice");
    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("les points du joueur 2 s'affichent en second", () => {
    const jeu = nouveauJeu();
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    expect(jeu.score()).toBe("Trente-Quinze");
  });

  it("trois points valent Quarante", () => {
    const jeu = nouveauJeu();
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Alice");
    jeu.pointPour("Bob");
    jeu.pointPour("Bob");
    expect(jeu.score()).toBe("Quarante-Trente");
  });
});
