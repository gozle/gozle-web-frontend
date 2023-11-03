export type PaginationRequest = {
  amount: number;
  page: number;
};

export type PaginatedRequest = {
  pagination: PaginationRequest;
};

export type PaginationResponse = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationResponse;
};
