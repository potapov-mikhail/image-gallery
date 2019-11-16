import { get } from 'request';
import { promisify } from 'util';
import { Image, Meta, ApiResponse } from './interfaces';

const getAsync = promisify(get);
const BASE_URL = 'https://api.unsplash.com';

export async function searchImage(
  search: string,
  page: number,
  clientId: string
): Promise<ApiResponse> {
  try {
    const response = await getAsync({
      url: `${BASE_URL}/search/photos?page=${page}&query=${search}&client_id=${clientId}`,
      json: true
    });

    const images = parseBody(response.body.results);
    const { perPage, totalPages, total } = parseHeaders(response.headers);

    return { page, total, perPage, totalPages, images };
  } catch (e) {
    throw e;
  }
}

export async function getImagesByPage(page: number, clientId: string): Promise<ApiResponse> {
  try {
    const response = await getAsync({
      url: `${BASE_URL}/photos?page=${page}&client_id=${clientId}`,
      json: true
    });

    const images = parseBody(response.body);
    const { perPage, totalPages, total } = parseHeaders(response.headers);

    return { page, total, perPage, totalPages, images };
  } catch (e) {
    throw e;
  }
}

function parseHeaders(headers: any): Meta {
  const total = parseInt(headers['x-total']);
  const perPage = parseInt(headers['x-per-page']);
  const totalPages = Math.ceil(total / perPage);

  return { total, totalPages, perPage, page: -1 };
}

function parseBody(items: any[]): Image[] {
  return items.map(item => ({ id: item.id, imageSrc: item.urls.small }));
}
