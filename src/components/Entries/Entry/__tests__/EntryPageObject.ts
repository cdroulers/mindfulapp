import { fireEvent, within } from "@testing-library/react";
import { PageObjectBase } from "../../../../shared/wrappers/PageObjectBase";
import { AndWrapper } from "../../../../shared/wrappers/AndWrapper";

export class EntryPageObject extends PageObjectBase<EntryPageObject> {
  public constructor(root: HTMLElement) {
    super(root);

    expect(root).toBeInTheDocument();
  }

  shouldHaveText(text: string): AndWrapper<EntryPageObject> {
    expect(within(this.root).getByText(text)).toBeInTheDocument();

    return new AndWrapper<EntryPageObject>(this);
  }

  shouldHaveBehavioralActivationText(text: string): AndWrapper<EntryPageObject> {
    expect(within(this.root).getByText(text)).toBeInTheDocument();

    return new AndWrapper<EntryPageObject>(this);
  }

  shouldHavePrimaryMood(text: string): AndWrapper<EntryPageObject> {
    expect(within(this.root).getByText(text)).toBeInTheDocument();

    return new AndWrapper<EntryPageObject>(this);
  }

  shouldHaveSecondaryMoods(moods: string[]): AndWrapper<EntryPageObject> {
    expect(within(this.root).getByText(moods.join(", "))).toBeInTheDocument();

    return new AndWrapper<EntryPageObject>(this);
  }

  async clickEdit(): Promise<void> {
    fireEvent.click(within(this.root).getByText("Edit"));
  }

  async clickDidIt(): Promise<void> {
    fireEvent.click(within(this.root).getByText(/I did it/));
  }
}
