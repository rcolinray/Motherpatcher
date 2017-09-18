export interface Cable {
  id: string;
  connectionIds: [string, string];
}

export type Connection = InputConnection | OutputConnection;

export type ConnectionPair = [Connection, Connection];

export interface Point {
  x: number;
  y: number;
}

export interface BaseConnection extends Point {
  id: string;
  mother32Id: string;
}

export interface InputConnection extends BaseConnection {
  type: 'input';
  patchPoint: Input;
}

export interface OutputConnection extends BaseConnection {
  type: 'output';
  patchPoint: Output;
}

export type Output = 'vca'
                   | 'noise'
                   | 'vcf'
                   | 'vcoSaw'
                   | 'vcoPulse'
                   | 'lfoTri'
                   | 'lfoSq'
                   | 'vcMix'
                   | 'mult1'
                   | 'mult2'
                   | 'assign'
                   | 'eg'
                   | 'kb'
                   | 'gate';

export type Input = 'extAudio'
                  | 'mixCv'
                  | 'vcaCv'
                  | 'vcfCutoff'
                  | 'vcfRes'
                  | 'vco1vOct'
                  | 'vcoLinFm'
                  | 'vcoMod'
                  | 'lfoRate'
                  | 'mix1'
                  | 'mix2'
                  | 'vcMixCtrl'
                  | 'mult'
                  | 'gate'
                  | 'tempo'
                  | 'runStop'
                  | 'reset'
                  | 'hold';
