import { Request, Response } from "express";
import { get } from "lodash";
import {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user.object.object.userId;
  const body = req.body;
  const product = await createProduct({ ...body, user: userId });

  res.status(201).send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user.object.object.userId;

  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    res.status(404).json("Something went wrong!");
  }

  if (get(product, "user") !== userId) {
    res.status(403);
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  res.status(200).json(updatedProduct);
}

export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      res.status(404).json("Product not found!");
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user.object.object.userId;
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    res.status(404).json("Something went wrong!");
  }

  if (get(product, "user") !== userId) {
    res.status(403);
  }

  await deleteProduct({ productId });

  res.status(200).json({ msg: "Successful! Product removed!" });
}
