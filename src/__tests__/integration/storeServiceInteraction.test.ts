import { setActivePinia, createPinia } from 'pinia';
import { useCharacterStore } from '@/stores/characterStore';
import { useEpisodeStore } from '@/stores/episodeStore';
import { useLocationStore } from '@/stores/locationStore';
import { characterService } from '@/services/characterService';
import { episodeService } from '@/services/episodeService';
import { locationService } from '@/services/locationService';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { eventBus } from '@/lib/eventBus';
import { responseMock } from '@/__mocks__/characterMock';
import { episodeArrayMock } from '@/__mocks__/episodeMock';
import { locationMock } from '@/__mocks__/locationMock';

vi.mock('@/lib/api');
vi.mock('@/services/characterService');
vi.mock('@/services/episodeService');
vi.mock('@/services/locationService');

beforeEach(() => {
  setActivePinia(createPinia());
  eventBus.all.clear();
  vi.clearAllMocks();
});

describe('Store-Service Integration', () => {
  it('characterStore fetches characters via characterService', async () => {
    vi.mocked(characterService.getCharacters).mockResolvedValue(responseMock);

    const store = useCharacterStore();
    await store.fetchCharacters();

    expect(store.characters).toHaveLength(1);
    expect(store.characters[0].name).toBe('Rick Sanchez');
    expect(store.info).toEqual(responseMock.info);
    expect(store.isLoading).toBe(false);
    expect(characterService.getCharacters).toHaveBeenCalledWith('');
    expect(characterService.getCharacters).toHaveBeenCalledTimes(1);
  });

  it('episodeStore fetches multiple episodes via episodeService', async () => {
    vi.mocked(episodeService.getMultipleEpisodes).mockResolvedValue(episodeArrayMock);

    const store = useEpisodeStore();
    await store.fetchMultipleEpisodes([1]);

    expect(store.episodes).toHaveLength(2);
    expect(store.episodes![0].name).toBe('Pilot');
    expect(store.isLoading).toBe(false);
    expect(episodeService.getMultipleEpisodes).toHaveBeenCalledWith([1]);
    expect(episodeService.getMultipleEpisodes).toHaveBeenCalledTimes(1);
  });

  it('locationStore fetches location via locationService', async () => {
    vi.mocked(locationService.getLocation).mockResolvedValue(locationMock);

    const store = useLocationStore();
    await store.fetchLocation(1);

    expect(store.location).toEqual(locationMock);
    expect(store.isLoading).toBe(false);
    expect(locationService.getLocation).toHaveBeenCalledWith(1);
    expect(locationService.getLocation).toHaveBeenCalledTimes(1);
  });

  it('characterStore handles service error and emits notification', async () => {
    const errorMessage = 'Network error';
    vi.mocked(characterService.getCharacters).mockRejectedValue(new Error(errorMessage));

    const store = useCharacterStore();
    const notificationSpy = vi.fn();
    eventBus.on('notification', notificationSpy);

    await store.fetchCharacters();

    expect(store.characters).toHaveLength(0);
    expect(store.info).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(notificationSpy).toHaveBeenCalledWith({ message: `Failed to fetch characters: ${errorMessage}` });
    expect(notificationSpy).toHaveBeenCalledTimes(1);
    expect(characterService.getCharacters).toHaveBeenCalledWith('');
    expect(characterService.getCharacters).toHaveBeenCalledTimes(1);
  });
});