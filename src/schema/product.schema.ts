import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({ required_error: "Please provide title!" }),
    description: string({ required_error: "Please provide description!" }).min(
      50,
      "Description shoud be at least 50 characters long!"
    ),
    price: number({ required_error: "Please provide number!" }),
    image: string({ required_error: "Please provide image!" }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "Please provide productId!",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
