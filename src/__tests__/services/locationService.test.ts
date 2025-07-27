import { beforeEach, describe, it, expect, vi } from 'vitest';
import { locationService } from '@/services/locationService';
import { api } from '@/lib/api';
import { locationMock } from '@/__mocks__/locationMock';

vi.mock('@/lib/api');

describe('LocationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches location successfully', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: locationMock });

    const result = await locationService.getLocation(1);

    expect(result).toEqual(locationMock);
    expect(api.get).toHaveBeenCalledWith('/location/1');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles getLocation error', async () => {
    const errorMessage = 'Not found';
    vi.mocked(api.get).mockRejectedValue(new Error(errorMessage));

    await expect(locationService.getLocation(999)).rejects.toThrow(errorMessage);
    expect(api.get).toHaveBeenCalledWith('/location/999');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles invalid ID (e.g., negative)', async () => {
    const errorMessage = 'Invalid ID';
    vi.mocked(api.get).mockRejectedValue(new Error(errorMessage));

    await expect(locationService.getLocation(-1)).rejects.toThrow(errorMessage);
    expect(api.get).toHaveBeenCalledWith('/location/-1');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});