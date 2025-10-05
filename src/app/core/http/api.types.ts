export interface ApiErrorPayload {
  title?: string;
  detail?: string;
  status?: number;
  traceId?: string;
  [k: string]: unknown;
}

export class ApiError extends Error {
  readonly status?: number;
  readonly payload?: ApiErrorPayload;

  constructor(message: string, opts?: { status?: number; payload?: ApiErrorPayload; cause?: unknown }) {
    super(message, { cause: opts?.cause });
    this.name = 'ApiError';
    this.status = opts?.status;
    this.payload = opts?.payload;
  }
}
