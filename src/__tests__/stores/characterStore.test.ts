import { setActivePinia, createPinia } from "pinia";
import { useCharacterStore } from "@/stores/characterStore";
import { characterService } from "@/services/characterService";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { eventBus } from "@/lib/eventBus";
import { responseMock, characterMock, characterArrayMock } from "@/__mocks__/characterMock";

vi.mock("@/services/characterService");

beforeEach(() => {
  setActivePinia(createPinia());
  // Clear event bus listeners before each test
  eventBus.all.clear();
});

describe("CharacterStore", () => {
  it("fetches characters successfully", async () => {
    vi.mocked(characterService.getCharacters).mockResolvedValue(responseMock);

    const store = useCharacterStore();
    await store.fetchCharacters();

    expect(store.characters).toHaveLength(1);
    expect(store.characters[0].name).toBe("Rick Sanchez");
    expect(store.info).toEqual(responseMock.info);
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  it("triggers notification on fetchCharacters error", async () => {
    const errorMessage = "Network error";
    vi.mocked(characterService.getCharacters).mockRejectedValue(
      new Error(errorMessage)
    );

    const store = useCharacterStore();
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);

    await store.fetchCharacters();

    expect(store.characters).toHaveLength(0);
    expect(store.info).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(notificationSpy).toHaveBeenCalledWith({
      message: `Failed to fetch characters: ${errorMessage}`,
    });
    expect(notificationSpy).toHaveBeenCalledTimes(1);
  });

  it("fetches character successfully", async () => {
    vi.mocked(characterService.getCharacter).mockResolvedValue(characterMock);

    const store = useCharacterStore();
    await store.fetchCharacter(1);

    expect(store.character).toEqual(characterMock);
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  it("triggers notification on fetchCharacter error", async () => {
    const errorMessage = "Network error";
    vi.mocked(characterService.getCharacter).mockRejectedValue(
      new Error(errorMessage)
    );

    const store = useCharacterStore();
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);

    await store.fetchCharacter(1);

    expect(store.character).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(notificationSpy).toHaveBeenCalledWith({
      message: `Failed to fetch character: ${errorMessage}`,
    });
    expect(notificationSpy).toHaveBeenCalledTimes(1);
  });

  it("fetches multiple characters successfully", async () => {
    vi.mocked(characterService.getMultipleCharacters).mockResolvedValue(
      characterArrayMock
    );

    const store = useCharacterStore();
    await store.fetchMultipleCharacters([1, 2]);

    expect(store.multipleCharacters).toHaveLength(2);
    expect(store.multipleCharacters[0].name).toBe("Rick Sanchez");
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  it("triggers notification on fetchMultipleCharacters error", async () => {
    const errorMessage = "Network error";
    vi.mocked(characterService.getMultipleCharacters).mockRejectedValue(
      new Error(errorMessage)
    );

    const store = useCharacterStore();
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);

    await store.fetchMultipleCharacters([1, 2]);

    expect(store.multipleCharacters).toHaveLength(0);
    expect(store.isLoading).toBe(false);
    expect(notificationSpy).toHaveBeenCalledWith({
      message: `Failed to fetch multiple characters: ${errorMessage}`,
    });
    expect(notificationSpy).toHaveBeenCalledTimes(1);
  });

  it("applies filters and fetches characters", async () => {
    const mockResponse = {
      info: { count: 826, pages: 42, next: "next_url", prev: null },
      results: [
        characterMock,
      ],
    };
    vi.mocked(characterService.getCharacters).mockResolvedValue(mockResponse);

    const store = useCharacterStore();
    await store.appplyFilters({ name: "Rick" });

    expect(store.filters).toEqual({ name: "Rick" });
    expect(store.characters).toHaveLength(1);
    expect(store.characters[0].name).toBe("Rick Sanchez");
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  it("clears filters and fetches characters", async () => {
    vi.mocked(characterService.getCharacters).mockResolvedValue(responseMock);

    const store = useCharacterStore();
    store.filters = { name: "Rick" };
    await store.clearFilters();

    expect(store.filters).toEqual({});
    expect(store.characters).toHaveLength(1);
    expect(store.characters[0].name).toBe("Rick Sanchez");
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on("notification", notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });
});
