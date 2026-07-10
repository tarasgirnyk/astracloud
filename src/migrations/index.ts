import * as migration_20260710_100352_client_identity_map from './20260710_100352_client_identity_map';

export const migrations = [
  {
    up: migration_20260710_100352_client_identity_map.up,
    down: migration_20260710_100352_client_identity_map.down,
    name: '20260710_100352_client_identity_map'
  },
];
