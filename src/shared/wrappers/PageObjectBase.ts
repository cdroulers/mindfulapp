import { AndWrapper } from "./AndWrapper";

export abstract class PageObjectBase<T extends PageObjectBase<T>> {
  protected root: HTMLElement;

  /**
   * @deprecated This is exposed for extensibility purposes, it should rarely be used directly!
   * @returns {HTMLElement} The root HTML element of the page object.
   */
  public get rootElement(): HTMLElement {
    return this.root;
  }

  constructor(root: HTMLElement) {
    this.root = root;
  }

  shouldHaveAttribute(attributeName: string, attributeValue?: string): AndWrapper<T> {
    expect(this.root).toHaveAttribute(attributeName, attributeValue);

    return new AndWrapper<T>(this as unknown as T);
  }

  shouldHaveClass(className: string): AndWrapper<T> {
    expect(this.root).toHaveClass(className);

    return new AndWrapper<T>(this as unknown as T);
  }

  shouldNotHaveClass(className: string): AndWrapper<T> {
    expect(this.root).not.toHaveClass(className);

    return new AndWrapper<T>(this as unknown as T);
  }
}
