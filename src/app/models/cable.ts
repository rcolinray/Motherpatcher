export interface Cable {
  id: string;
  outputModuleId: string;
  output: Output;
  inputModuleId: string;
  input: Input;
}

export enum Output {
  Vca,
  Noise,
  Vcf,
  VcoSaw,
  VcoPulse,
  LfoTri,
  LfoSq,
  VcMix,
  Mult1,
  Mult2,
  Assign,
  Eg,
  Kb,
  Gate,
}

export enum Input {
  ExtAudio,
  MixCv,
  VcaCv,
  VcfCutoff,
  VcfRes,
  Vco1vOct,
  VcoLinFm,
  VcoMod,
  LfoRate,
  Mix1,
  Mix2,
  VcMixCtrl,
  Mult,
  Gate,
  Tempo,
  RunStop,
  Reset,
  Hold,
}
