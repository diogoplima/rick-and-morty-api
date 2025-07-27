import { beforeEach, describe, it, expect, vi } from 'vitest';
import { episodeService } from '@/services/episodeService';
import { Episode } from '@/types/episode';
import { api } from '@/lib/api';
import { episodeMock, episodeArrayMock } from '@/__mocks__/episodeMock';

vi.mock('@/lib/api');

describe('EpisodeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches multiple episodes successfully', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: episodeArrayMock });

    const result = await episodeService.getMultipleEpisodes([1, 2]);

    expect(result).toEqual(episodeArrayMock);
    expect(api.get).toHaveBeenCalledWith('/episode/1,2');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles getMultipleEpisodes error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(api.get).mockRejectedValue(new Error(errorMessage));

    await expect(episodeService.getMultipleEpisodes([1, 2])).rejects.toThrow(errorMessage);
    expect(api.get).toHaveBeenCalledWith('/episode/1,2');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles empty IDs array', async () => {
    const mockEpisodes: Episode[] = [];
    vi.mocked(api.get).mockResolvedValue({ data: mockEpisodes });

    const result = await episodeService.getMultipleEpisodes([]);

    expect(result).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/episode/');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles single ID', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [episodeMock] });

    const result = await episodeService.getMultipleEpisodes([1]);

    expect(result).toEqual([episodeMock]);
    expect(api.get).toHaveBeenCalledWith('/episode/1');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});