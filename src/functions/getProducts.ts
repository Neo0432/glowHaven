import axios from "axios";
import { ICatalog } from "../app/catalog/Product";

export default async function GetProducts(): Promise<ICatalog> {
  try {
    const responce: {
      data: ICatalog;
      status: number;
      statusText: string;
      headers: object;
      config: object;
      request: object;
    } = await axios.get("https://dummyjson.com/products");

    if (responce.status != 200) {
      console.log(`Responce: ${responce.status}`);
      return { products: [], total: 0, skip: 0, limit: 0 };
    }

    return responce.data;
  } catch (error) {
    console.log(error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
}
