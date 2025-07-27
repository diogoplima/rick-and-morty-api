import { setActivePinia, createPinia } from 'pinia';
import { useCharacterStore } from '@/stores/characterStore';
import { useModalStore } from '@/stores/modalStore';
import { characterService } from '@/services/characterService';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { markRaw } from 'vue';
import { eventBus } from '@/lib/eventBus';
import { responseMock } from '@/__mocks__/characterMock';

vi.mock('@/services/characterService');

beforeEach(() => {
  setActivePinia(createPinia());
  eventBus.all.clear();
  vi.clearAllMocks();
});

describe('Store-Store Interaction', () => {
  it('opens modal after successful character fetch', async () => {
    vi.mocked(characterService.getCharacters).mockResolvedValue(responseMock);

    const charStore = useCharacterStore();
    const modalStore = useModalStore();
    const mockComponent = markRaw({ name: 'character-modal' });

    await charStore.fetchCharacters();
    modalStore.openModal({ title: 'Character Details', component: mockComponent, props: { character: charStore.characters[0] } });

    expect(charStore.characters).toHaveLength(1);
    expect(modalStore.modalStack).toHaveLength(1);
    expect(modalStore.modalStack[0].title).toBe('Character Details');
    expect(modalStore.modalStack[0].component).toBe(mockComponent);
    expect(modalStore.modalStack[0].props.character).toBe(charStore.characters[0]);
  });

  it('closes modal and maintains character state', async () => {
    vi.mocked(characterService.getCharacters).mockResolvedValue(responseMock);

    const charStore = useCharacterStore();
    const modalStore = useModalStore();
    const mockComponent = markRaw({ name: 'character-modal' });

    await charStore.fetchCharacters();
    modalStore.openModal({ title: 'Character Details', component: mockComponent, props: { character: charStore.characters[0] } });
    modalStore.closeModal();

    expect(charStore.characters).toHaveLength(1);
    expect(modalStore.modalStack).toHaveLength(0);
  });
});