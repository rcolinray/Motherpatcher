export interface Cable {
  id: string;
  outputMother32Id: string | null;
  output: Output | null;
  outputX: number | null;
  outputY: number | null;
  inputMother32Id: string | null;
  input: Input | null;
  inputX: number | null;
  inputY: number | null;
}

export function initCable(id: string): Cable {
  return {
    id,
    outputMother32Id: null,
    output: null,
    outputX: null,
    outputY: null,
    inputMother32Id: null,
    input: null,
    inputX: null,
    inputY: null,
  };
}

export function initCableInput(id: string, inputMother32Id: string, input: Input, inputX: number, inputY: number): Cable {
  return {
    ...initCable(id),
    inputMother32Id,
    input,
    inputX,
    inputY,
  }
}

export function initCableOutput(id: string, outputMother32Id: string, output: Output, outputX: number, outputY: number): Cable {
  return {
    ...initCable(id),
    outputMother32Id,
    output,
    outputX,
    outputY,
  };
}

export type PatchPoint = Input | Output;

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
