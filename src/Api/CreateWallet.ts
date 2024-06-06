// import ProtectedAxiosInstance from "./utils/apiBaseUrl";
import { ApiHandler } from "./utils/fetchUtil";
import axios from "axios";

interface APIResponse<T> {
  body: T;
  success?: boolean;
  message?: string;
}

type APIResult<T> = [APIResponse<T> | null, null | string];

type APIFunction<T> = (data: object) => Promise<APIResult<T>>;

interface Assets {
    walletId: string;
    address: any;
    chain: string;
    body: any
}

const ProtectedAxiosInstance = axios.create({
  baseURL: 'http://35.232.113.249:8080',
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllAssets: APIFunction<Assets> = async (data) =>
  ApiHandler(async () => await ProtectedAxiosInstance.post("/generate-custodial-managed-wallet", data));

const getGasAddress: APIFunction<any> = async (data) =>
  ApiHandler(async () => await ProtectedAxiosInstance.post("/create-gas-address", data));

export { getAllAssets, getGasAddress, ProtectedAxiosInstance };
