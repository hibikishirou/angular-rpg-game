import { Role } from '../model/Character';

export const RoleConfig: Role[] = [
  {
    id: 1,
    name: 'Knight',
    rateStr: 0.5,
    rateInt: 0.3,
    rateAgi: 0.3,
    rateVit: 0.5,
    rateLuck: 0.3,
  },
  {
    id: 2,
    name: 'Magician',
    rateStr: 0.2,
    rateInt: 0.5,
    rateAgi: 0.4,
    rateVit: 0.3,
    rateLuck: 0.4,
  },
  {
    id: 3,
    name: 'Archer',
    rateStr: 0.4,
    rateInt: 0.2,
    rateAgi: 0.5,
    rateVit: 0.2,
    rateLuck: 0.5,
  },
  {
    id: 4,
    name: 'Priest',
    rateStr: 0.1,
    rateInt: 0.4,
    rateAgi: 0.3,
    rateVit: 0.4,
    rateLuck: 0.5,
  },
  {
    id: 5,
    name: 'Warrior',
    rateStr: 0.5,
    rateInt: 0.1,
    rateAgi: 0.2,
    rateVit: 0.5,
    rateLuck: 0.4,
  },
];
