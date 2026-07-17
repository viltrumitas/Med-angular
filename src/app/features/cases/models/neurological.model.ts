import { CincinnatiModel } from './cincinnati.model';
import { GlasgowRequest } from './glasgow-request.model';

export interface NeurologicalModel {
  cincinnati: CincinnatiModel | null;
  glasgow: GlasgowRequest | null;
}
