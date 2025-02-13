import { Character } from '../model/Character';

export const hpCalculator = (detail: Partial<Character> | null) => {
  const { str = 0, vit = 0 } = detail || {};
  return Math.floor(str * 5 + vit * 10 + 100);
};

export const mpCalculator = (detail: Partial<Character> | null) => {
  const { int = 0, vit = 0 } = detail || {};
  return Math.floor(int * 10 + vit * 5 + 100);
};
export const staminaCalculator = (detail: Partial<Character> | null) => {
  const { vit = 0 } = detail || {};
  return Math.floor(vit * 5 + 100);
};

export default { hpCalculator, mpCalculator, staminaCalculator };
