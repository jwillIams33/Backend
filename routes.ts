import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.ts";

const router = new Router();

router.get("/API/products", getProducts)
  .get("/API/products/:id", getSingleProduct)
  .post("/API/products", addProduct)
  .put("/API/products/:id", updateProduct)
  .delete("/API/products/:id", deleteProduct);

export default router;
