export type ApiError = {
  message: string;
  status: number;
  response?: {
    data?: { error?: string };
    status?: number;
  };
};
