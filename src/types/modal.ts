import { Component } from 'vue';

// Generic type for modal props, constrained by the component's props
export interface Modal<P extends Record<string, any> = Record<string, any>> {
  title: string;
  component: Component;
  props: P;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}