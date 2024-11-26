import axios from "axios";
import { ICatalog } from "../app/catalog/Product";

export default async function GetProducts(): Promise<ICatalog> {
  try {
    const response: {
      data: ICatalog;
      status: number;
      statusText: string;
      headers: object;
      config: object;
      request: object;
    } = await axios.get("https://dummyjson.com/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}
