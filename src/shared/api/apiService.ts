import { Mutex } from 'async-mutex';
import axios, { AxiosHeaders } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { CURRENT_USER_QUERY_KEYS } from '@entities/user';

import { queryClient } from './queryClient';
import { apiUrls } from './urls';

import type { Tokens } from './types';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { isUnauthorizedStatus } from '@shared/helpers';
import { deleteTokens, getTokens, saveTokens } from './tokens';

class ApiService {
  instance: AxiosInstance;
  private mutex = new Mutex();

  constructor(private tokens: Tokens | null) {
    this.instance = applyCaseMiddleware(axios.create());

    this.instance.interceptors.request.use(this.requestInterception.bind(this));
    this.instance.interceptors.response.use(
      undefined,
      this.errorInterception.bind(this),
    );
  }

  private get headers(): AxiosHeaders {
    const headers = new AxiosHeaders();

    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    if (this.tokens) {
      headers.set('Authorization', `Bearer ${this.tokens.access}`);
    }

    return headers;
  }

  private async requestInterception(config: InternalAxiosRequestConfig) {
    await this.mutex.waitForUnlock();
    config.headers = this.headers.concat(config.headers);

    return config;
  }

  private async errorInterception(error: AxiosError) {
    if (!isUnauthorizedStatus(error.response?.status)) {
      return Promise.reject(error);
    }

    if (!this.mutex.isLocked()) {
      const release = await this.mutex.acquire();
      const tokens = await this.refreshTooken();
      release();

      if (!tokens) {
        this.clearTokens();
        this.tokens = null;

        queryClient.setQueryData(CURRENT_USER_QUERY_KEYS, () => null);

        return Promise.reject(error);
      }
      this.setTokens(tokens);
    }

    await this.mutex.waitForUnlock();

    const originalConfig = error.config;

    // удаляем старый токен из хедеров что бы не перетереть новый
    originalConfig?.headers.delete('Authorization');

    return this.instance(originalConfig as AxiosRequestConfig);
  }

  private async refreshTooken(): Promise<Tokens | null> {
    if (!this.tokens?.refresh) return null;

    try {
      const { data } = await axios.post(
        apiUrls.JWT.REFRESH,
        { refresh: this.tokens.refresh },
        { headers: this.headers },
      );

      return data;
    } catch (error) {
      return null;
    }
  }

  get axios() {
    return this.instance;
  }

  setTokens(tokens: Tokens) {
    this.tokens = tokens;
    saveTokens(tokens);
  }

  clearTokens() {
    this.tokens = null;
    deleteTokens();
  }
}

export const apiService = new ApiService(getTokens());
