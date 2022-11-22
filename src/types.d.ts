declare type Args = string[];
declare type Options = {
  help: boolean;
  new: boolean;
};
declare interface Flag {
  name: string;
  description: string;
  alias?: string | null;
}
declare interface Command {
  name: string;
  description: string;
}

declare type Runner = (fn: () => void, condition: boolean) => void;

declare interface CustomError {
  code: string;
  message: string;
}
