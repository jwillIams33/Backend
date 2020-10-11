import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";
import {
  RouterContext,
  HttpError,
  Status,
} from "https:deno.land/x/oak@v6.3.1/mod.ts";

import { CourseGoal } from "../models/product.ts";

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
>;

let products: Product[] = [];

// const getProducts = (ctx: RContext) => {
//   ctx.response.body = {
//     success: true,
//     data: products,
//   };
// };

const getProducts = async (ctx: RContext) => {
  try {
    products = await CourseGoal.findAll();
    console.log(products);
    ctx.response.body = {
      products,
    };
  } catch (err) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
};

const getSingleProduct = async (ctx: RContext) => {
  try {
    const id = ctx.params.id!;
    console.log(id);
    const goal = await CourseGoal.findById(id);
    if (!goal) {
      const error = new HttpError();
      error.status = Status.NotFound;
      throw error;
    }

    ctx.response.body = {
      goal,
    };
  } catch (err) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
};

// Get A Product @route GET /API/products
// const getProduct = ({
//   params,
//   response,
// }: {
//   params: { id: string };
//   response: any;
// }) => {
//   const product: Product | undefined = products.find((p) => p.id === params.id);

//   if (product) {
//     response.status = 200;
//     response.body = {
//       success: true,
//       data: product,
//     };
//   } else {
//     response.status = 404;
//     response.body = {
//       success: false,
//       msg: "No Product Found",
//     };
//   }
// };

// Add A Product @route POST /API/products
const addProduct = async (ctx: RContext) => {
  const body = await ctx.request.body();
  if (body.type === "json") {
    const value = await body.value;
    console.log(value);
  }
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      msg: "No Data",
    };
  } else {
    const product: Product = await body.value;
    product.id = v4.generate();
    products.push(product);
    await CourseGoal.create(product);
    // const text: string = product.value.text;
    // const checked: boolean = product.value.checked;
    // const points: number = product.value.points;
    // const id = await Todo.create({text: text, checked: checked, points: points});
    ctx.response.status = 201;
    ctx.response.body = {
      success: true,
      data: product,
    };
  }
};

// Update A Product @route PUT /API/products/:id
const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();

    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Product Found",
    };
  }
};

// Delete A Product @route DELETE /API/products/:id
const deleteProduct = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const id = params.id!;
  products = products.filter((p) => p.id !== params.id);
  console.log(id);
  try {
    await CourseGoal.delete(id);
  } catch (err) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
  response.body = {
    success: true,
    msg: "Product Removed",
  };
};

export { getProducts, getSingleProduct, addProduct, updateProduct, deleteProduct };
