export enum Type {
  Info = 'info',
  Success = 'success',
  Fail = 'fail',
  Loading = 'loading'
}

export enum Animation {
  In = 'in',
  Out = 'out'
}

export interface Option {
  content: string;
  duration?: number;
  onClose?: () => void;
}
