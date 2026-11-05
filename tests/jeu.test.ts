import { describe, it, expect } from "vitest";
import { Jeu } from "../src/jeu";
import type { Classement } from "../src/classement";

// Dummy car le constructeur exige un classement mais ces tests ne vérifient que le score
const classementInutile: Classement = { enregistrer: () => {} };

function nouveauJeu() {
  return new Jeu("Alice", "Bob", classementInutile);
}

function marquer(jeu: Jeu, joueur: string, nombre: number) {
  for (let i = 0; i < nombre; i++) jeu.pointPour(joueur);
}

describe("Les points", () => {
  it("un jeu commence à Zéro-Zéro", () => {
    expect(nouveauJeu().score()).toBe("Zéro-Zéro");
  });

  it("un premier point vaut Quinze", () => {
    const jeu = nouveauJeu();
    marquer(jeu, "Alice", 1);
    expect(jeu.score()).toBe("Quinze-Zéro");
  });

  it("les points du joueur 2 s'affichent en second", () => {
    const jeu = nouveauJeu();
    marquer(jeu, "Alice", 2);
    marquer(jeu, "Bob", 1);
    expect(jeu.score()).toBe("Trente-Quinze");
  });

  it("trois points valent Quarante", () => {
    const jeu = nouveauJeu();
    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 2);
    expect(jeu.score()).toBe("Quarante-Trente");
  });

  it("à points égaux le score s'annonce A", () => {
    const jeu = nouveauJeu();
    marquer(jeu, "Alice", 1);
    marquer(jeu, "Bob", 1);
    expect(jeu.score()).toBe("Quinze-A");
  });
});

describe("Le point décisif", () => {
  it("à quarante partout le score est Égalité", () => {
    const jeu = nouveauJeu();
    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 3);
    expect(jeu.score()).toBe("Égalité");
  });

  it("à égalité le point suivant gagne le match", () => {
    const jeu = nouveauJeu();
    marquer(jeu, "Alice", 3);
    marquer(jeu, "Bob", 3);
    marquer(jeu, "Alice", 1);
    expect(jeu.score()).toBe("Victoire Alice");
  });
});

describe("La victoire", () => {
  it("le joueur à Quarante qui marque gagne le match", () => {
    const jeu = nouveauJeu();
    marquer(jeu, "Bob", 4);
    expect(jeu.score()).toBe("Victoire Bob");
  });
});
