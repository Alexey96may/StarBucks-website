export class Burger {
    #burgerButton = document.getElementById("burger") as HTMLInputElement;
    #burgerSvg = document.querySelector(".burger svg");
    #headerNav = document.getElementById("headerNav");
    #body = document.querySelector("body");
    animationSpeed = 500;
    #isMenuOpen = false;

    constructor() {
        this.#burgerButton?.addEventListener("click", (event) => {
            event.stopPropagation();
            this.animationOn();
            this.classesToggle();
            this.toggleMenu();
        });

        this.#body?.addEventListener("click", (event) => {
            event.stopPropagation();
            if (
                (event.target as HTMLElement).closest("header") &&
                this.#isMenuOpen &&
                (event.target as HTMLElement).tagName?.toLowerCase() === "a"
            ) {
                //this.changeOverflow(this.BODY, "auto");
                this.toggleMenu();
                this.classesToggle();
            }
        });
    }

    classesToggle(): void {
        this.#burgerButton?.classList.toggle("burger--cancel");
        setTimeout(() => {
            this.#burgerButton?.classList.toggle("burger--cross");
        }, this.animationSpeed / 2);
        this.#headerNav?.classList.toggle("nav--appear");
        this.#body?.classList.toggle("body__fixed");
    }

    animationOn(): void {
        this.#burgerButton.disabled = true;

        this.#burgerSvg.animate(
            [
                { strokeDashoffset: "0px" },
                { strokeDashoffset: "-50px" },
                { strokeDashoffset: "0px" },
            ],
            {
                duration: this.animationSpeed,
                iterations: 1,
            }
        );

        setTimeout(() => {
            this.#burgerButton.disabled = false;
        }, this.animationSpeed);
    }

    toggleMenu(): void {
        if (this.#isMenuOpen) {
            this.#isMenuOpen = false;
        } else {
            this.#isMenuOpen = true;
        }
    }
}
