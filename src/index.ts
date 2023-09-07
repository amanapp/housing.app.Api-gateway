import express,{Express} from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { logger } from "./middleware/winsdon.middleware";
import "./config/env.config";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";

const app:Express = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routes = {
  /**
   *  users microservices routes
   */
  "/user/signup": "http://localhost:3000",
  "/user/login": "http://localhost:3000",
  "/owner/signup": "http://localhost:3000",
  "/owner/login": "http://localhost:3000",
  "/otp-send": "http://localhost:3000",
  "/user/verify": "http://localhost:3000",
  "/owner/verify": "http://localhost:3000",
  "/owner/post": "http://localhost:3000",
  "/add/subscription": "http://localhost:3000",
  "/user/subscription": "http://localhost:3000",
  "/subscription/show": "http://localhost:3000",
  "/subscription/revoke": "http://localhost:3000",
  "/user/view-restrict": "http://localhost:3000",
  "/newtoken": "http://localhost:3000",
  "/user/wishlist-show": "http://localhost:3000",
  "/user/wishlist-property": "http://localhost:3000",
  "/property/pic": "http://localhost:3000",
  "/logout/user": "http://localhost:3000",
  /**
   *  Property Microservices routes
   */
  "  property/post": "http://localhost:3001",
  "/user/wishlist": "http://localhost:3001",
  "/property/pic_add": "http://localhost:3001",
  "/property/status": "http://localhost:3001",
  "/property/show": "http://localhost:3001",
  "/property/report": "http://localhost:3001",
  "/property/sort": "http://localhost:3001",

  /**
   *  chat microservices routes
   */
  "/chat": "http://localhost:3003",
  "/connected": "http://localhost:3003",
};

for (const route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({ target }));
}

const port = process.env.PORT;
app.listen(port, () => {
    logger.log({
        level: "info",
        message: `Server started on ${port}`,
      });
});
