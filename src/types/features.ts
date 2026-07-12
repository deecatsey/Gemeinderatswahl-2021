export type ElectionFeature = GeoJSON.Feature & {
  properties: { WSPRID: string };
};

export type ElectionResultRow = {
  Wahl: string;
  Wahlsprengel: string;
  Wahlberechtigte: number;
  abgegebeneStimmen: number;
  gueltigeStimmen: number;
  SPO: number;
  FPO: number;
  OEVP: number;
  GRUENE: number;
  NEOS: number;
  KPO: number;
  LINZ: number;
  VOLT: number;
  WANDL: number;
  MFG: number;
  R: number;
};
