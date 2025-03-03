import Cookies from "js-cookie";

export const getSessionToken = () => {
  const sessionToken = Cookies.get("TEACHER.INFOUNA-SESSION")
    ? Cookies.get("TEACHER.INFOUNA-SESSION")
    : "";
  return sessionToken;
};

export const setSessionToken = (token: string) => {
  Cookies.set("TEACHER.INFOUNA-SESSION", token, {
    expires: 1,
  });
};

export const removeSessionToken = () => {
  Cookies.remove("TEACHER.INFOUNA-SESSION");
};
