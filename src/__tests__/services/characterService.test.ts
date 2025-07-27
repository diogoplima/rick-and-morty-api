import { beforeEach, describe, it, expect, vi } from 'vitest';
import { characterService } from '@/services/characterService';
import { Character } from '@/types/character';
import { api } from '@/lib/api';
import { responseMock, characterMock, characterArrayMock } from '@/__mocks__/characterMock';

vi.mock('@/lib/api');

describe('CharacterService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches characters successfully with query params', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: responseMock });

    const result = await characterService.getCharacters('name=Rick');

    expect(result).toEqual(responseMock);
    expect(api.get).toHaveBeenCalledWith('/character/?name=Rick');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('fetches characters successfully without query params', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: responseMock });

    const result = await characterService.getCharacters();

    expect(result).toEqual(responseMock);
    expect(api.get).toHaveBeenCalledWith('/character');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles getCharacters error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(api.get).mockRejectedValue(new Error(errorMessage));

    await expect(characterService.getCharacters('name=Rick')).rejects.toThrow(errorMessage);
    expect(api.get).toHaveBeenCalledWith('/character/?name=Rick');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('fetches a single character successfully', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: characterMock });

    const result = await characterService.getCharacter(1);

    expect(result).toEqual(characterMock);
    expect(api.get).toHaveBeenCalledWith('/character/1');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles getCharacter error', async () => {
    const errorMessage = 'Not found';
    vi.mocked(api.get).mockRejectedValue(new Error(errorMessage));

    await expect(characterService.getCharacter(999)).rejects.toThrow(errorMessage);
    expect(api.get).toHaveBeenCalledWith('/character/999');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('fetches multiple characters successfully', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: characterArrayMock });

    const result = await characterService.getMultipleCharacters([1, 2]);

    expect(result).toEqual(characterArrayMock);
    expect(api.get).toHaveBeenCalledWith('/character/1,2');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles getMultipleCharacters error', async () => {
    const errorMessage = 'Invalid IDs';
    vi.mocked(api.get).mockRejectedValue(new Error(errorMessage));

    await expect(characterService.getMultipleCharacters([1, 999])).rejects.toThrow(errorMessage);
    expect(api.get).toHaveBeenCalledWith('/character/1,999');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles empty IDs array for getMultipleCharacters', async () => {
    const mockCharacters: Character[] = [];
    vi.mocked(api.get).mockResolvedValue({ data: mockCharacters });

    const result = await characterService.getMultipleCharacters([]);

    expect(result).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/character/');
    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('handles single ID for getMultipleCharacters', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [characterMock] });

    const result = await characterService.getMultipleCharacters([1]);

    expect(result).toEqual([characterMock]);
    expect(api.get).toHaveBeenCalledWith('/character/1');
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});