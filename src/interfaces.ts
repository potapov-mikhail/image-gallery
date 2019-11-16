export interface Meta {
  page: number;
  total: number;
  totalPages: number;
  perPage: number;
}

export interface Image {
  id: string;
  imageSrc: string;
}

export interface ApiResponse extends Meta {
  images: Image[];
}
