import { PageObjectBase } from "./PageObjectBase";
import { AndWrapper } from "./AndWrapper";

export abstract class InputPageObjectBase<
  T extends InputPageObjectBase<T>,
> extends PageObjectBase<T> {
  constructor(root: HTMLElement) {
    super(root);

    expect(root).toBeInTheDocument();
  }

  abstract shouldBeDisabled(): AndWrapper<T>;

  abstract shouldNotBeDisabled(): AndWrapper<T>;
}
