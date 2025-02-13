export type Character = {
  id: number;
  name: string;
  userId: number;
  roleId: number;
  level: number;
  exp: number;
  str: number;
  int: number;
  agi: number;
  vit: number;
  luck: number;
};

export type TempCharacter = Partial<Character>;

export type Role = {
  id: number;
  name: string;
  rateStr: number;
  rateInt: number;
  rateAgi: number;
  rateVit: number;
  rateLuck: number;
};
