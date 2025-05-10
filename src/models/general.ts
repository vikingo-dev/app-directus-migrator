type MigrationItem = "users" | "policies & permissions" | "roles" | "schema" | "flows" | "dashboards";

interface Connection {
  url: string;
  token: string;
}

interface Connections {
  source: Connection;
  destination: Connection;
}

interface MigrationState {
  source: Connection;
  destination: Connection;
  itemsToMigrate: MigrationItem[];
}

export type {
  MigrationItem,
  Connection,
  Connections,
  MigrationState
}

const initConnection: Connection = {
  url: "",
  token: ""
}

const initConnections: Connections = {
  source: initConnection,
  destination: initConnection
}

export {
  initConnection,
  initConnections,
}