import { CincinnatiModel } from './cincinnati.model';

export interface NeurologicalModel {
  cincinnati: CincinnatiModel | null;
  glasgow: number | null;
}
