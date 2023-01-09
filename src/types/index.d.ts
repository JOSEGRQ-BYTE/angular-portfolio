export {};

declare global {
  interface Array<T> {
    sortByProperty(property : string, precedence: string | null): T[];
  }
}