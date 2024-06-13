import { toPage } from "../../utils/route-builder.js";
import ErrorPage from "../error-screens.js";
import { PageLoader } from "../loading.js";
import LoginPages from "./login-pages.js";
// import SessionManager from "./session.js";
import Events from "./../../utils/Events.js";
import { navigate } from "../../utils/navigate.js";
import { validateSession } from "../../services/auth.js";
import { sidebarMapConfig } from "../../config/sidebar-config.js";
import LocalStorage from "../../utils/local-storage.js";

export default class AuthHandler {
  constructor() {
    this.currentUrl = window.location.href.split("/");

    this.init();
  }

  async init() {
    const validated = await validateSession();

    if (validated) {
      const { dashUrl } = this.getActiveRole();

      if (!this.isAuthPage() && !this.isHomePage()) {
        if (!this.validateCurrentPath()) {
          ErrorPage.notAuthorized();
          return;
        }

        PageLoader.disable();

        document.querySelector(".content-body").classList.remove("hide");
        return;
      }

      navigate(dashUrl);
    } else {
      if (!this.isHomePage() && !this.isAuthPage()) {
        ErrorPage.notAuthorized();
        return;
      }

      !this.isAuthPage() && navigate(toPage("auth/login-adm"));
    }

    this.handleLogin();
  }

  handleLogin() {
    const currentLocation = this.currentUrl[5];
    const pageOptions = Object.freeze({
      adm: LoginPages.admin,
      colaborador: LoginPages.colaborador,
    });

    for (const [key, action] of Object.entries(pageOptions)) {
      if (currentLocation.includes(key)) {
        action();
      }
    }
  }

  isAuthPage() {
    try {
      return this.currentUrl[4].includes("auth");
    } catch (error) {
      return false;
    }
  }

  isHomePage() {
    return this.currentUrl.length < 5;
  }

  getActiveRole() {
    let layoutConfig = sidebarMapConfig[LocalStorage.get("LAYOUT")] ?? [];

    return {
      dashUrl: layoutConfig[0].path,
      layoutConfig,
    };
  }

  validateCurrentPath() {
    const { layoutConfig } = this.getActiveRole();
    const currentPath = window.location.pathname;
    let isValidated = false;

    layoutConfig.forEach((route) => {
      if (route.path && route.path.includes(currentPath)) {
        console.log("same");
        isValidated = true;
        return;
      }
    });

    return isValidated;
  }
}

Events.$onPageLoad(() => {
  new AuthHandler();
});
