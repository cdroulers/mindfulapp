import { AndWrapper } from "./AndWrapper";
import { PageObjectBase } from "./PageObjectBase";

export class NullablePageObject<T extends PageObjectBase<T>> {
  private element: HTMLElement | null;
  private builder: (elemnt: HTMLElement) => T;

  constructor(element: HTMLElement | null, builder: (elemnt: HTMLElement) => T) {
    this.element = element;
    this.builder = builder;
  }

  shouldBeInTheDocument(): AndWrapper<T> {
    expect(this.element).toBeInTheDocument();
    return new AndWrapper<T>(this.subject);
  }

  shouldNotBeInTheDocument(): void {
    expect(this.element).not.toBeInTheDocument();
  }

  get subject(): T {
    // This assumes you've checked manually.
    return this.builder(this.element!);
  }
}
