import "dotenv/config";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import databaseClient from "../../database/client";
import requestRepository from "../../src/modules/request/requestRepository";

// Mock complet de la base de données
jest.mock("../../database/client");

describe("requestRepository", () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  describe("read", () => {
    it("should return a request when id is valid", async () => {
      // Préparer les données de mock
      const mockRequest = {
        id: 1,
        title: "Test Request",
        tag1: "Tag1",
        tag2: "Tag2",
        details1: "Detail 1",
        details2: "Detail 2",
        details3: "Detail 3",
        user_id: 1,
      };

      // Configurer le mock pour retourner les données attendues
      // @ts-ignore - Ignorer l'erreur de type pour le test
      databaseClient.query.mockResolvedValueOnce([[mockRequest], []]);

      // Appeler la fonction à tester
      const result = await requestRepository.read(1);

      // Vérifier que la fonction a été appelée correctement
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT"),
        [1],
      );

      // Vérifier le résultat
      expect(result).toEqual(mockRequest);
    });

    it("should return undefined when request is not found", async () => {
      // Configurer le mock pour retourner un tableau vide
      // @ts-ignore - Ignorer l'erreur de type pour le test
      databaseClient.query.mockResolvedValueOnce([[], []]);

      // Appeler la fonction à tester
      const result = await requestRepository.read(999);

      // Vérifier que la fonction a été appelée correctement
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT"),
        [999],
      );

      // Vérifier le résultat - modifié pour correspondre au comportement réel
      expect(result).toBeUndefined();
    });
  });

  describe("create", () => {
    it("should create a new request and return insert ID", async () => {
      // Préparer les données de test
      const newRequest = {
        title: "New Request",
        tag1: "Tag1",
        tag2: "Tag2",
        details1: "Detail 1",
        details2: "Detail 2",
        details3: "Detail 3",
        user_id: 1,
      };

      // Configurer le mock pour retourner les données attendues
      const mockInsertResult = { insertId: 123 };
      // @ts-ignore - Ignorer l'erreur de type pour le test
      databaseClient.query.mockResolvedValueOnce([mockInsertResult, []]);

      // Appeler la fonction à tester
      const result = await requestRepository.create(newRequest);

      // Vérifier que la fonction a été appelée correctement
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("insert"),
        expect.any(Array),
      );

      // Vérifier le résultat - modifié pour correspondre au comportement réel
      expect(result).toBe(123);
    });
  });
});
