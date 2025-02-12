import { DBConfig } from 'ngx-indexed-db';
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
          name: 'role',
          keypath: 'role',
          options: { unique: false },
        },
        {
          name: 'name',
          keypath: 'name',
          options: { unique: false },
        },
      ],
    },
  ],
};

export default dbConfig;
