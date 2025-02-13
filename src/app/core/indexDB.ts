import { DBConfig } from 'ngx-indexed-db';
// Ahead of time compiles requires an exported function for factories
export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (dbL: IDBDatabase, transaction: IDBTransaction) => {
    },
  };
}

const dbConfig: DBConfig = {
  name: 'angular-rpg-db',
  version: 1,
  objectStoresMeta: [
    {
      store: 'user',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'username',
          keypath: 'username',
          options: { unique: false },
        },
        {
          name: 'password',
          keypath: 'password',
          options: { unique: false },
        },
      ],
    },
    {
      store: 'character',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        {
          name: 'userId',
          keypath: 'userId',
          options: {
            unique: false,
          },
        },
        {
          name: 'roleId',
          keypath: 'roleId',
          options: { unique: false },
        },
        {
          name: 'name',
          keypath: 'name',
          options: { unique: false },
        },
        {
          name: 'level',
          keypath: 'level',
          options: { unique: false },
        },
        {
          name: 'exp',
          keypath: 'exp',
          options: { unique: false },
        },
        {
          name: 'str',
          keypath: 'str',
          options: { unique: false },
        },
        {
          name: 'int',
          keypath: 'int',
          options: { unique: false },
        },
        {
          name: 'agi',
          keypath: 'agi',
          options: { unique: false },
        },
        {
          name: 'vit',
          keypath: 'vit',
          options: { unique: false },
        },
        {
          name: 'luck',
          keypath: 'luck',
          options: { unique: false },
        },
      ],
    },
  ],
  migrationFactory,
};

export default dbConfig;
