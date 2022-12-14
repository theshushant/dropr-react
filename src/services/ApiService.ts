import * as axios from "axios";
import { AxiosInstance } from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export type Dictionary<T = any> = { [key: string]: T };

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.default.create();
  }

  static getInstance(): ApiService {
    return new ApiService();
  }

  get<T>(
    uri: string,
    useAuthHeaders: boolean,
    queryParams?: Dictionary<any>,
    responseType?: any,
  ): Promise<T> {
    return this.axiosInstance
      .get(this._fullyQualifiedUri(uri), {
        params: queryParams,
        ...this._getHttpHeaders(useAuthHeaders),
        responseType: responseType || "json",
      })
      .then(response => this._getResponse(response))
      .catch(err => {
        throw this._throwError(err);
      });
  }

  post<T>(
    uri: string,
    useAuthHeaders: boolean,
    body?: Dictionary<string>,
    headers?: any,
  ): Promise<T> {
    return this.axiosInstance
      .post(
        this._fullyQualifiedUri(uri),
        body,
        this._getHttpHeaders(useAuthHeaders, headers),
      )
      .then(response => this._getResponse(response))
      .catch(err => {
        throw this._throwError(err);
      });
  }

  put<T>(
    uri: string,
    useAuthHeaders: boolean,
    body?: any,
    useBaseUrl?: boolean,
  ): Promise<T> {
    return this.axiosInstance
      .put(
        useBaseUrl ? this._fullyQualifiedUri(uri) : uri,
        body,
        this._getHttpHeaders(useAuthHeaders),
      )
      .then(response => this._getResponse(response))
      .catch(err => {
        throw this._throwError(err);
      });
  }

  delete<T>(uri: string, useAuthHeaders: boolean): Promise<T> {
    return this.axiosInstance
      .delete(
        this._fullyQualifiedUri(uri),
        this._getHttpHeaders(useAuthHeaders),
      )
      .then(response => this._getResponse(response))
      .catch(err => {
        throw this._throwError(err);
      });
  }

  private _getHttpHeaders(useAuthHeaders: boolean, additionalHeaders?: any) {
    const headers = {
      // "Content-Type": "application/json",
      // Accept: "application/json",
      ...additionalHeaders,
    };

    if (useAuthHeaders) {
      headers.Authorization = localStorage.getItem("auth_token");
    }

    return { headers };
  }

  private _fullyQualifiedUri(uri: string) {
    return `${BASE_URL}${uri}`;
  }

  private _getResponse(response: axios.AxiosResponse) {
    console.log("api service");
    console.log(response);
    console.log(response.status);
    console.log(response.data);

    if (response.data === null || response.data.isEmpty) {
      return null;
    }

    return response.data;
  }

  private _throwError(err: any): Error {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
}

export const apiService = ApiService.getInstance();
