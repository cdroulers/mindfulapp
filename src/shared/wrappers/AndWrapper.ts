export class AndWrapper<T> {
  private chain: T;
  constructor(chain: T) {
    this.chain = chain;
  }

  get and(): T {
    return this.chain;
  }
}
