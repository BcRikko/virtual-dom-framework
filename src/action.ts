export type ActionType<State> = (state: State, ...data: any) => void | any;

export interface ActionTree<State> {
  [action: string]: ActionType<State>;
}
