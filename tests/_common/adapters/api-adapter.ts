import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { ENV } from "../env";
import { injectable } from "inversify";

interface RequestOptions {
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  cancelToken?: CancelTokenSource["token"];
}

@injectable()
export class ApiProxy {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.FRONTEND_HOST,
    });
  }

  private async request<T>(
    method: string,
    url: string,
    options?: RequestOptions
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        params: options?.params,
        data: options?.data,
        headers: options?.headers,
        cancelToken: options?.cancelToken,
      };
      const response: AxiosResponse<T> = await this.axiosInstance.request(
        config
      );
      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        throw new Error("Request canceled");
      } else {
        throw new Error(`Error calling API: ${error.message}`);
      }
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", url, options);
  }

  async post<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", url, options);
  }

  async put<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", url, options);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", url, options);
  }
}
