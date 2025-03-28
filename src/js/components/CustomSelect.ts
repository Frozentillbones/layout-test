// CustomSelect.ts
interface CustomSelectOptions {
  selector: string;
  placeholder?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (value: string) => void;
}

class CustomSelect {
  private element: HTMLElement;
  private nativeSelect: HTMLSelectElement;
  private options: HTMLOptionElement[];
  private isOpen: boolean = false;
  private config: CustomSelectOptions;

  constructor(config: CustomSelectOptions) {
    this.config = config;
    this.element = document.querySelector(config.selector) as HTMLElement;
    this.nativeSelect = this.element.querySelector("select")!;
    this.options = Array.from(this.nativeSelect.options);

    this.init();
  }

  private init() {
    this.createCustomMarkup();
    this.setupEventListeners();
    this.syncNativeSelect();
  }

  private createCustomMarkup() {
    const selectedOption =
      this.options.find((opt) => opt.selected) || this.options[0];
    const control = document.createElement("div");
    control.className = "custom-select__control";
    control.setAttribute("role", "combobox");
    control.setAttribute("aria-haspopup", "listbox");
    control.tabIndex = 0;

    control.innerHTML = `
        <span class="custom-select__placeholder">${
          selectedOption?.text || this.config.placeholder
        }</span>
    <svg class="icon"><use href="../img/svg/sprite.svg#arrow" /></svg>
      `;

    const optionsList = document.createElement("div");
    optionsList.className = "custom-select__options";
    optionsList.setAttribute("role", "listbox");
    optionsList.setAttribute("aria-expanded", "false");

    this.options.forEach((option) => {
      const optionEl = document.createElement("div");
      optionEl.className = "custom-select__option";
      optionEl.setAttribute("role", "option");
      optionEl.setAttribute("aria-selected", "false");
      optionEl.textContent = option.text;
      optionEl.dataset.value = option.value;
      optionsList.appendChild(optionEl);
    });

    this.element.appendChild(control);
    this.element.appendChild(optionsList);
  }

  private setupEventListeners() {
    const control = this.element.querySelector(".custom-select__control")!;
    const optionsList = this.element.querySelector(".custom-select__options")!;

    control.addEventListener("click", () => this.toggle());
    // @ts-ignore
    control.addEventListener("keydown", (e) => this.handleControlKeydown(e));
    // @ts-ignore
    optionsList.addEventListener("click", (e) => this.handleOptionClick(e));
    // @ts-ignore
    optionsList.addEventListener("keydown", (e) => this.handleOptionKeydown(e));
    document.addEventListener("click", (e) => this.handleClickOutside(e));
  }

  private toggle() {
    this.isOpen ? this.close() : this.open();
  }

  private open() {
    this.isOpen = true;
    this.element.classList.add("custom-select__is-open");
    this.element
      .querySelector(".custom-select__options")!
      .setAttribute("aria-expanded", "true");
    this.config.onOpen?.();
  }

  private close() {
    this.isOpen = false;
    this.element.classList.remove("custom-select__is-open");
    this.element
      .querySelector(".custom-select__options")!
      .setAttribute("aria-expanded", "false");
    this.config.onClose?.();
  }

  private handleControlKeydown(e: KeyboardEvent) {
    if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      this.toggle();
    }
  }

  private handleOptionClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("custom-select__option")) {
      this.selectOption(target);
    }
  }

  private handleOptionKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.selectOption(target);
    }
  }

  private selectOption(optionEl: HTMLElement) {
    const value = optionEl.dataset.value!;
    const text = optionEl.textContent!;

    this.element.querySelector(".custom-select__placeholder")!.textContent =
      text;
    this.options.forEach((opt) => (opt.selected = opt.value === value));
    this.close();
    this.config.onChange?.(value);
  }

  private handleClickOutside(e: MouseEvent) {
    if (!this.element.contains(e.target as Node)) {
      this.close();
    }
  }

  private syncNativeSelect() {
    this.nativeSelect.classList.add("custom-select__native");
    this.nativeSelect.addEventListener("change", () => {
      const selected = this.options.find((opt) => opt.selected);
      this.element.querySelector(".custom-select__placeholder")!.textContent =
        selected?.text || "";
    });
  }
}

export default CustomSelect;
