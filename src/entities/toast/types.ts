export enum ToastKind {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ToastMessageTypes = keyof typeof ToastKind;

export type ToastMessage = {
  id: number;
  message: string;
  type: ToastMessageTypes;
  delay?: number;
};
