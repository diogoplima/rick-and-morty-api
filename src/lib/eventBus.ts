import mitt from 'mitt';

type Events = {
  notification: { message: string; duration?: number };
};

export const eventBus = mitt<Events>();