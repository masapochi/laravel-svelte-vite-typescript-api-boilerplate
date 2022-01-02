import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT as string,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

http.interceptors.response.use(
  (response) => {
    return Promise.resolve({
      success: true,
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
  },
  (error) => {
    return Promise.reject(makeErrorResponse(error));
  }
);

const makeErrorResponse = (e: any) => {
  const errorNote =
    "お手数ですが、下記のメッセージとエラーコードを管理者に連絡してください。";
  if (e.response) {
    console.log(e.response);
    const { status, statusText, data } = e.response;

    // API error
    if (data.errors) {
      console.log("API ERROR");
      return {
        success: false,
        status,
        statusText,
        message: data.message,
        note: "",
        errors: data.errors,
      };
    }

    // Server error
    console.log("SERVER ERROR");
    return {
      success: false,
      status,
      statusText,
      message: "アプリケーションの処理中に何らかのエラーが発生しました。",
      note: errorNote,
      errors: [`${statusText} ( Code: ${status} )`],
      detail: data,
    };
  }

  // Network error
  if (e.message) {
    console.log("NETWORK ERROR");
    return {
      success: false,
      status: 503,
      statusText: "現在アプリケーションを利用することができません。",
      message: "現在アプリケーションを利用することができません。",
      note: errorNote,
      errors: ["Service Unavailable ( Code: 503 )"],
    };
  }

  // Unknown error
  console.log("UNKNOWN ERROR");
  return {
    success: false,
    status: "アプリケーションの処理中に原因不明なエラーが発生しました。",
    statusText: "アプリケーションの処理中に原因不明なエラーが発生しました。",
    message: e.message,
    note: errorNote,
    errors: ["Unknown Error"],
  };
};

export default http;
