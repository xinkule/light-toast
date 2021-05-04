export type Type = 'info' | 'success' | 'fail' | 'loading';

export type NoArgsReturnVoidFunction = () => void;

export interface Message {
  id: number;
  type: Type;
  content: string;
  duration?: number;
  onClose?: NoArgsReturnVoidFunction;
}
