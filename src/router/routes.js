import Start from "@/pages/Start";
import Epilogue from "@/pages/Epilogue";
import store from "@/store";
import { LOAD_PAGE } from "@/store/types";

const routes = [
  {
    path: "/",
    component: Start
  },
  {
    path: "/epilogue/:page?",
    component: Epilogue,
    beforeEnter: (to, from, next) => {
      const page = to.params.page ? parseInt(to.params.page) : 1;
      store
        .dispatch(LOAD_PAGE, page)
        .then(() => next(true))
        .catch(() => next("/404"));
    }
  }
];

export default routes;
