import { Notify } from 'quasar';

export const successNotify = (message: string) => {
  Notify.create({
    type: 'positive',
    message: message,
    position: 'top-right',
    progress: true,
  });
};
export const errorNotify = (message: string) => {
  Notify.create({
    type: 'negative',
    message: message || 'System Error',
    position: 'top-right',
    progress: true,
  });
};
