export type Args = string[];
export type Options = {
  help: boolean;
  new: boolean;
};
export interface Flag {
  name: string;
  description: string;
  alias?: string | null;
}
export interface Command {
  name: string;
  description: string;
}

export type Runner = (fn: () => void, condition: boolean) => void;
