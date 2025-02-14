export type Stat = {
  str: number;
  int: number;
  agi: number;
  vit: number;
  luck: number;
};

export type Character = {
  id?: number;
  name: string;
  userId?: number;
  roleId: number;
  level: number;
  exp: number;
} & Stat;

export type MapCharacter = {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  stamina: number;
  maxStamina: number;
} & Character;

export type Role = {
  id: number;
  name: string;
  rateStr: number;
  rateInt: number;
  rateAgi: number;
  rateVit: number;
  rateLuck: number;
};
