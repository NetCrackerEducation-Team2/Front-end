export interface ButtonInfo {
  buttonInfoId: number;
  name: string;
  url: string;
  disabled: boolean;
  hidden?: boolean;
  clickFunction: () => void;
}
