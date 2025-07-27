import { setActivePinia, createPinia } from 'pinia';
import { useEpisodeStore } from '@/stores/episodeStore';
import { episodeService } from '@/services/episodeService';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { eventBus } from '@/lib/eventBus';
import { episodeArrayMock } from '@/__mocks__/episodeMock';

vi.mock('@/services/episodeService');

beforeEach(() => {
  setActivePinia(createPinia());
  // Clear event bus listeners before each test
  eventBus.all.clear();
});

describe('EpisodeStore', () => {
  it('fetches multiple episodes successfully', async () => {
    vi.mocked(episodeService.getMultipleEpisodes).mockResolvedValue(episodeArrayMock);

    const store = useEpisodeStore();
    await store.fetchMultipleEpisodes([1, 2]);

    expect(store.episodes).toHaveLength(2);
    expect(store.episodes![0].name).toBe('Pilot');
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on('notification', notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  it('triggers notification on fetchMultipleEpisodes error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(episodeService.getMultipleEpisodes).mockRejectedValue(new Error(errorMessage));

    const store = useEpisodeStore();
    const notificationSpy = vi.fn();
    eventBus.on('notification', notificationSpy);

    await store.fetchMultipleEpisodes([1, 2]);

    expect(store.episodes).toHaveLength(0);
    expect(store.isLoading).toBe(false);
    expect(notificationSpy).toHaveBeenCalledWith({ message: `Failed to fetch multiple characters: ${errorMessage}` });
    expect(notificationSpy).toHaveBeenCalledTimes(1);
  });

  it('handles empty result set', async () => {
    vi.mocked(episodeService.getMultipleEpisodes).mockResolvedValue([]);

    const store = useEpisodeStore();
    await store.fetchMultipleEpisodes([1, 2]);

    expect(store.episodes).toHaveLength(0);
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on('notification', notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });
});