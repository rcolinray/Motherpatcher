export interface Mother32 {
  id: string;
  frequency: number;
  vcoWave: boolean;
  pulseWidth: number;
  mix: number;
  cutoff: number;
  resonance: number;
  vcaMode: boolean;
  volume: number;
  glide: number;
  vcoModSource: boolean;
  vcoModAmount: number;
  vcoModDest: boolean;
  vcfMode: boolean;
  vcfModSource: boolean;
  vcfModAmount: number;
  vcfModPolarity: boolean;
  tempo: number;
  lfoRate: number;
  lfoWave: boolean;
  attack: number;
  sustain: boolean;
  decay: number;
  vcMix: number;
  octave: number;
}

export type Knob = 'frequency'
                 | 'pulseWidth'
                 | 'mix'
                 | 'cutoff'
                 | 'resonance'
                 | 'volume'
                 | 'glide'
                 | 'vcoModAmount'
                 | 'vcfModAmount'
                 | 'tempo'
                 | 'lfoRate'
                 | 'attack'
                 | 'decay'
                 | 'vcMix';

export function isOffsetKnob(knob: Knob): boolean {
  return knob === 'frequency' ||
         knob === 'pulseWidth' ||
         knob === 'tempo' ||
         knob === 'lfoRate';
}

export type Switch = 'vcoWave'
                   | 'vcaMode'
                   | 'vcoModSource'
                   | 'vcoModDest'
                   | 'vcfMode'
                   | 'vcfModSource'
                   | 'vcfModPolarity'
                   | 'lfoWave'
                   | 'sustain';

export function initMother32(id: string) {
  return {
    id,
    frequency: 0,
    vcoWave: false,
    pulseWidth: 0,
    mix: 0,
    cutoff: 300,
    resonance: 0,
    vcaMode: false,
    volume: 150,
    glide: 0,
    vcoModSource: false,
    vcoModAmount: 0,
    vcoModDest: true,
    vcfMode: false,
    vcfModSource: true,
    vcfModAmount: 0,
    vcfModPolarity: true,
    tempo: 0,
    lfoRate: 0,
    lfoWave: false,
    attack: 0,
    sustain: false,
    decay: 0,
    vcMix: 0,
    octave: 4,
  };
}
