export interface ApiResponse {
  page: number;
  total: number;
  images: Image[];
  totalPages: number;
}

export interface Image {
  id: string;
  imageSrc: string;
}

export interface LoadParams {
  search: string;
  page: number;
}
