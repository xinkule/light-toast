export type TypeWithIcon = 'success' | 'fail' | 'loading';

export type Type = 'info' | TypeWithIcon;

export type NoArgsReturnVoidFunction = () => void;

export interface Message {
  id: number;
  type: Type;
  content: string;
  duration?: number;
  onClose?: NoArgsReturnVoidFunction;
}
