import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  mode: "history",

  routes: [
    {
      path: "/profile",
      name: "profile",
      component: () => lazyLoadView(import("@/views/profile")),
      meta: {
        auth: true
      }
    },
    {
      path: "/timetracker",
      name: "timetracker",
      component: () => lazyLoadView(import("@/views/timetracker")),
      meta: {
        auth: true
      }
    },
    {
      path: "/expenses",
      name: "expenses",
      component: () => lazyLoadView(import("@/views/expenses")),
      meta: {
        auth: true
      }
    },
    {
      path: "/reports",
      name: "reports",
      component: () => lazyLoadView(import("@/views/reports")),
      meta: {
        auth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => lazyLoadView(import("@/views/login")),
      meta: {
        guest: true
      }
    },
    {
      path: "/",
      name: "home",
      component: () => lazyLoadView(import("@/views/home"))
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else if (to.matched.some(record => record.meta.guest)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next({
          path: "/profile"
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require("@/views/_loading").default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require("@/views/_timeout").default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    }
  });
}

export default router;
