import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.ts";

const router = new Router();

router.get("/API/products", getProducts)
  .get("/API/products/:id", getProduct)
  .post("/API/products", addProduct)
  .put("/API/products/:id", updateProduct)
  .delete("/API/products/:id", deleteProduct);

export default router;
