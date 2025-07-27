import { setActivePinia, createPinia } from 'pinia';
import { useLocationStore } from '@/stores/locationStore';
import { locationService } from '@/services/locationService';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { eventBus } from '@/lib/eventBus';
import { locationMock } from '@/__mocks__/locationMock';

vi.mock('@/services/locationService');

beforeEach(() => {
  setActivePinia(createPinia());
  // Clear event bus listeners before each test
  eventBus.all.clear();
});

describe('LocationStore', () => {
  it('fetches location successfully', async () => {
    vi.mocked(locationService.getLocation).mockResolvedValue(locationMock);

    const store = useLocationStore();
    await store.fetchLocation(1);

    expect(store.location).toEqual(locationMock);
    expect(store.isLoading).toBe(false);
    // No notification event should be emitted
    const notificationSpy = vi.fn();
    eventBus.on('notification', notificationSpy);
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  it('triggers notification on fetchLocation error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(locationService.getLocation).mockRejectedValue(new Error(errorMessage));

    const store = useLocationStore();
    const notificationSpy = vi.fn();
    eventBus.on('notification', notificationSpy);

    await store.fetchLocation(1);

    expect(store.location).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(notificationSpy).toHaveBeenCalledWith({ message: `Failed to fetch characters: ${errorMessage}` });
    expect(notificationSpy).toHaveBeenCalledTimes(1);
  });
});