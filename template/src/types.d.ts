declare type Args = string[];

declare type Options = {
  help: boolean;
  hi: boolean;
};
declare interface Flag {
  name: string;
  description: string;
  alias?: string | null;
  type: any;
  option?: string;
}
declare interface Command {
  name: string;
  description: string;
}

declare type Runner = (
  fn: (params?: any) => void,
  condition: boolean,
  args?: any
) => void;

declare interface CustomError {
  code: string;
  message: string;
}
