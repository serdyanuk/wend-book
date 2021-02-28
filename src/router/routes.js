import Start from "@/pages/Start";
import Epilogue from "@/pages/Epilogue";
import store from "@/store";
import { LOAD_PAGE } from "@/store/types";
import Error404 from "@/pages/Error404";
import progressBar from "@/progressBar";

const routes = [
  {
    path: "/",
    component: Start
  },
  {
    path: "/epilogue/:page?",
    component: Epilogue,
    beforeEnter: (to, from, next) => {
      const bar = progressBar.start();
      const page = to.params.page ? parseInt(to.params.page) : 1;
      store
        .dispatch(LOAD_PAGE, page)
        .then(() => {
          bar.finish();
          next(true);
        })
        .catch(() => {
          bar.fail();
          next("/404");
        });
    }
  },
  {
    path: "/404",
    name: "error404",
    component: Error404
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "error404" }
  }
];

export default routes;
