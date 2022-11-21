export const getError = (err: any): string => err?.response?.data?.message || err.message;
