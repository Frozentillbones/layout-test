type CustomRangeOptions = {
  unit: string;
};

export class CustomRange {
  private container: HTMLElement;
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private output!: HTMLOutputElement;
  private options: CustomRangeOptions;

  constructor(containerSelector: string, options: CustomRangeOptions) {
    this.container = document.querySelector(containerSelector) as HTMLElement;
    this.input = this.container.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    this.label = this.container.querySelector("label") as HTMLLabelElement;
    this.options = options;

    this.create();
    this.initialize();
  }

  private create() {
    this.output = document.createElement("output");
    this.output.className = "custom-range__value";
    this.output.textContent = `${this.input.value} ${this.options.unit}`;

    const header = document.createElement("div");
    header.className = "custom-range__header";

    this.container.insertBefore(header, this.input);
    header.appendChild(this.label);
    header.appendChild(this.output);

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "custom-range__wrapper";
    this.container.insertBefore(inputWrapper, this.input.nextSibling);
    inputWrapper.appendChild(this.input);

    this.container.classList.add("custom-range");
  }

  private initialize() {
    this.input.addEventListener("input", () => this.updateValue());
    this.updateValue();
  }

  private updateValue() {
    this.output.textContent = `${this.input.value} ${this.options.unit}`;
  }
}
