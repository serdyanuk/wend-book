import Start from "@/pages/Start";
import Epilogue from "@/pages/Epilogue";
import Error404 from "@/pages/Error404";

const routes = [
  {
    path: "/",
    component: Start
  },
  {
    path: "/epilogue/:page?",
    component: Epilogue
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
