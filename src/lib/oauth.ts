import { ISSUER_BASE_URL } from "./api";

const ensureLeadingSlash = (path: string): string =>
  path.startsWith("/") ? path : `/${path}`;

export const resolveAuthorizationRedirect = (redirectUri: string): string => {
  if (!redirectUri) {
    return ISSUER_BASE_URL;
  }

  try {
    return new URL(redirectUri).toString();
  } catch {
    return `${ISSUER_BASE_URL}${ensureLeadingSlash(redirectUri)}`;
  }
};
