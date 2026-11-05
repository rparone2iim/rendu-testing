// Service externe du tournoi : reçoit le résultat d'un match
export interface Classement {
  enregistrer(vainqueur: string, perdant: string): void;
}
