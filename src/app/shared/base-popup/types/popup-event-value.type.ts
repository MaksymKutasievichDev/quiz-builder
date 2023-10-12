export type TBasePopupEvent = 'confirm' | 'close' | 'cancel';

export type TBaseEventHandler<E, P extends string = 'on'> = {
  [K in E & string as `${P}${Capitalize<K>}`]: () => void;
};
