export type Args = string[];
export type Options = {
  help: boolean;
};
export interface Flag {
  name: string;
  description: string;
  alias?: string | null;
}
