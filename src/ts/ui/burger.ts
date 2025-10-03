export class Burger {
    #burgerButton = document.getElementById("burger");
    // #header = document.getElementById("header");
    #headerNav = document.getElementById("headerNav");
    #body = document.querySelector("body");
    // #bgWrapper = document.getElementById("bg-wrapper");
    // #bodyWrapper = document.querySelector(".wrapper");
    #isMenuOpen = false;

    constructor() {
        this.#burgerButton?.addEventListener("click", (event) => {
            event.stopPropagation();
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

        // this.#bodyWrapper?.addEventListener("click", (event) => {
        //     event.stopPropagation();
        //     this.toggleMenu();
        //     this.classesToggle();
        // });
    }

    classesToggle(): void {
        this.#burgerButton?.classList.toggle("burger--cancel");
        this.#headerNav?.classList.toggle("nav--appear");
        this.#body?.classList.toggle("body__fixed");
        // this.#bodyWrapper?.classList.toggle("wrapper--active");
    }

    toggleMenu(): void {
        if (this.#isMenuOpen) {
            this.#isMenuOpen = false;
        } else {
            this.#isMenuOpen = true;
        }
    }
}
