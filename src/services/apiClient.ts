import axios, { CancelTokenSource } from "axios";
import User from "../types/User";
import formData from "./formData";
import UpdateUser from "../types/UpdateUser";
import Category from "../types/Category";
import { END_POINT } from "./data";

const axiosInstance = axios.create({
  baseURL: END_POINT,
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async () => {
    return await axiosInstance.get<T[]>(this.endpoint).then((res) => {
      return res.data;
    });
  };

  getAllByCategories = async (categories: Category[]) => {
    if (!categories || categories.length === 0) {
      // If no categories are provided, return an empty array or handle it as needed
      return [];
    }

    const params = {};
    categories.forEach((category, index) => {
      params[`categoriesName[${index}]`] = category.CategoryName;
    });

    return await axiosInstance
      .get<T[]>(this.endpoint, {
        params,
        paramsSerializer: (params) => {
          return Object.keys(params)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join("&");
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("Failed to fetch books by categories");
      });
  };

  getBySearch = async (search?: string) => {
    if (!search) return [];

    return await axiosInstance
      .get<T>(this.endpoint, {
        params: {
          title: search,
        },
      })
      .then((res) => res.data);
  };

  get = async (title: string) => {
    return await axiosInstance
      .get<T>(this.endpoint + "/" + title)
      .then((res) => {
        return res.data;
      });
  };

  getChart = async () => {
    return await axiosInstance.get(this.endpoint).then((res) => {
      return res.data;
    });
  };

  getReport = async (id: string) => {
    return await axiosInstance.get(this.endpoint + "/" + id).then((res) => {
      return res.data;
    });
  };

  getPost = async (id: string) => {
    return await axiosInstance.get(this.endpoint + "/" + id).then((res) => {
      return res.data.data;
    });
  };

  create = async (data: T): Promise<T> => {
    const newData = formData(data);
    const source: CancelTokenSource = axios.CancelToken.source();
    // Create a timeout promise that rejects after 5 seconds
    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => {
        source.cancel("Request timed out");
        reject(new Error("Request timed out"));
      }, 60000)
    );

    // Race the actual request against the timeout
    return Promise.race([
      axiosInstance
        .post<T>(this.endpoint, newData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          cancelToken: source.token,
        })
        .then((res) => res.data),
      timeout,
    ]).catch((err) => {
      throw err;
    });
  };

  update = async (data: T, title: string): Promise<T> => {
    const newData = formData(data);
    const source: CancelTokenSource = axios.CancelToken.source();

    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => {
        source.cancel("Request timed out");
        reject(new Error("Request timed out"));
      }, 60000)
    );

    return Promise.race([
      axiosInstance
        .post<T>(`${this.endpoint}/${title}`, newData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          cancelToken: source.token,
        })
        .then((res) => res.data),
      timeout,
    ]).catch((err) => {
      throw err;
    });
  };

  delete = async (id: string): Promise<void> => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => {
        source.cancel("Request timed out");
        reject(new Error("Request timed out"));
      }, 10000)
    );

    return Promise.race([
      axiosInstance
        .delete<void>(this.endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
          cancelToken: source.token,
          data: {
            Title: id,
          },
        })
        .then((res) => res.data),
      timeout,
    ]).catch((err) => {
      throw err;
    });
  };

  deletePost = async (id: string) => {
    const source: CancelTokenSource = axios.CancelToken.source();
    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => {
        source.cancel("Request timed out");
        reject(new Error("Request timed out"));
      }, 10000)
    );

    return Promise.race([
      axiosInstance
        .delete<void>(this.endpoint + "/" + id, {
          headers: {
            "Content-Type": "application/json",
          },
          cancelToken: source.token,
        })
        .then((res) => res.data),
      timeout,
    ]).catch((err) => {
      throw err;
    });
  };

  login = async (data: User) => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => {
        source.cancel("Request timed out");
        reject(new Error("Request timed out"));
      }, 10000)
    );

    return Promise.race([
      axiosInstance
        .post(this.endpoint, data, {
          cancelToken: source.token,
        })
        .then((res) => res.data),
      timeout,
    ]).catch((err) => {
      throw err;
    });
  };

  logout = async (token: string) => {
    return await axiosInstance
      .post(this.endpoint, "string", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token.toString(),
        },
      })
      .then((res) => res.data);
  };

  deleteUser = async (userId: string) => {
    return await axiosInstance
      .delete(this.endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: userId,
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  email = async (email: string) => {
    return await axiosInstance
      .post(this.endpoint, { Email: email })
      .then((res) => {
        return res.data;
      });
  };

  otp = async (email: string, resetCode: string, token: string) => {
    return await axiosInstance
      .post(this.endpoint, { Email: email, ResetCode: resetCode, Token: token })
      .then((res) => {
        return res.data;
      });
  };

  newPassword = async (email: string, password: string, token: string) => {
    return await axiosInstance.post(this.endpoint, {
      Email: email,
      Password: password,
      Token: token,
    });
  };

  updateUser = async (data: UpdateUser) => {
    return await axiosInstance
      .post(this.endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: data.Token,
        },
      })
      .then((res) => res.data);
  };
}

export default ApiClient;
