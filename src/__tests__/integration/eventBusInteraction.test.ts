import { setActivePinia, createPinia } from 'pinia';
import { useCharacterStore } from '@/stores/characterStore';
import { useEpisodeStore } from '@/stores/episodeStore';
import { characterService } from '@/services/characterService';
import { episodeService } from '@/services/episodeService';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { eventBus } from '@/lib/eventBus';
import { responseMock } from '@/__mocks__/characterMock';
import { episodeArrayMock } from '@/__mocks__/episodeMock';

vi.mock('@/services/characterService');
vi.mock('@/services/episodeService');

beforeEach(() => {
  setActivePinia(createPinia());
  eventBus.all.clear();
  vi.clearAllMocks();
});

describe('EventBus Integration', () => {
  it('notifies on multiple store errors', async () => {
    const charError = 'Character network error';
    const epiError = 'Episode network error';
    vi.mocked(characterService.getCharacters).mockRejectedValue(new Error(charError));
    vi.mocked(episodeService.getMultipleEpisodes).mockRejectedValue(new Error(epiError));

    const charStore = useCharacterStore();
    const epiStore = useEpisodeStore();
    const notificationSpy = vi.fn();
    eventBus.on('notification', notificationSpy);

    await charStore.fetchCharacters();
    await epiStore.fetchMultipleEpisodes([1]);

    expect(notificationSpy).toHaveBeenCalledWith({ message: `Failed to fetch characters: ${charError}` });
    expect(notificationSpy).toHaveBeenCalledWith({ message: `Failed to fetch multiple characters: ${epiError}` });
    expect(notificationSpy).toHaveBeenCalledTimes(2);
    expect(charStore.characters).toHaveLength(0);
    expect(epiStore.episodes).toHaveLength(0);
  });

  it('handles concurrent store updates without interference', async () => {
    vi.mocked(characterService.getCharacters).mockResolvedValue(responseMock);
    vi.mocked(episodeService.getMultipleEpisodes).mockResolvedValue(episodeArrayMock);

    const charStore = useCharacterStore();
    const epiStore = useEpisodeStore();

    await Promise.all([charStore.fetchCharacters(), epiStore.fetchMultipleEpisodes([1])]);

    expect(charStore.characters).toHaveLength(1);
    expect(epiStore.episodes).toHaveLength(2);
    expect(charStore.isLoading).toBe(false);
    expect(epiStore.isLoading).toBe(false);
  });
});