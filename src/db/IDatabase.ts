export interface IDatabase {
  connect(): Promise<void>;
  closeConnection(): Promise<void>;
}
