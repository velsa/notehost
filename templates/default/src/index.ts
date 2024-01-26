import { Env, initializeReverseProxy, reverseProxy } from "notehost";
import { SITE_CONFIG } from "./site-config";

initializeReverseProxy(SITE_CONFIG);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return await reverseProxy(request, env);
  },
};
