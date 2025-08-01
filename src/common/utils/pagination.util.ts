import { Paginated } from '../interfaces/paginated.interface';

export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number,
): Paginated<T> {
  return {
    data,
    total,
    page,
    pageSize,
  };
}
