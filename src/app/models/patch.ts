import { Mother32 } from './mother32';
import { ConnectionPair } from './cable';

export interface Patch {
  name: string;
  notes: string;
  mother32s: Mother32[];
  connections: ConnectionPair[];
}
