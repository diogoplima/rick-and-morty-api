import { setActivePinia, createPinia } from 'pinia';
import { useModalStore } from '@/stores/modalStore';
import { markRaw } from 'vue';
import { beforeEach, describe, it, expect } from 'vitest';

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('ModalStore', () => {
  it('opens a modal and adds it to the stack', () => {
    const store = useModalStore();
    const mockComponent = markRaw({ name: 'test-component' });
    const modalConfig = { title: 'Test Modal', component: mockComponent, props: {} };

    store.openModal(modalConfig);

    expect(store.modalStack).toHaveLength(1);
    expect(store.modalStack[0]).toEqual({ ...modalConfig, component: mockComponent });
  });

  it('closes a modal and removes it from the stack', () => {
    const store = useModalStore();
    const mockComponent = markRaw({ name: 'test-component' });
    const modalConfig = { title: 'Test Modal', component: mockComponent, props: {} };

    store.openModal(modalConfig);
    store.closeModal();

    expect(store.modalStack).toHaveLength(0);
  });

  it('does not close modal if stack is empty', () => {
    const store = useModalStore();

    store.closeModal();

    expect(store.modalStack).toHaveLength(0);
  });

  it('closes only the top modal when multiple modals are open', () => {
    const store = useModalStore();
    const mockComponent1 = markRaw({ name: 'test-component-1' });
    const mockComponent2 = markRaw({ name: 'test-component-2' });
    const modalConfig1 = { title: 'Modal 1', component: mockComponent1, props: {} };
    const modalConfig2 = { title: 'Modal 2', component: mockComponent2, props: {} };

    store.openModal(modalConfig1);
    store.openModal(modalConfig2);
    store.closeModal();

    expect(store.modalStack).toHaveLength(1);
    expect(store.modalStack[0]).toEqual({ ...modalConfig1, component: mockComponent1 });
  });
});