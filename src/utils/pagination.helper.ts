import { formatDateInSql } from './date.helper'

// Sorting direction type
type SortDirection = 'ASC' | 'DESC'

// Configuration options for pagination
interface PaginationConfig {
  sortingKeys?: string[]
  filterKeys?: string[]
  defaultSortingKey?: string
  maxLimit?: number
  defaultLimit?: number
}

// Query parameters from request
interface PaginationQuery {
  page?: string | number
  limit?: string | number
  sortKey?: string
  sortValue?: string
  filterKey?: string
  filterValue?: string
  from_date?: string
  to_date?: string
}

// Parsed pagination result
interface PaginationResult {
  page: number
  limit: number
  skip: number
  sortingDirection: SortDirection
  sortingKey: string
  filterKey?: string
  filterValue?: string
  fromDate?: string
  toDate?: string
}

// Response data structure
interface PaginationResponse<T> {
  totalPages: number
  numberOfRows: number
  currentPage: number
  limit: number
  totalRecords: number
  paginatedResults: T[]
}

// Default configuration
const DEFAULT_CONFIG: Required<PaginationConfig> = {
  sortingKeys: ['created_at', 'id'],
  filterKeys: [],
  defaultSortingKey: 'created_at',
  maxLimit: 500,
  defaultLimit: 10,
}

/**
 * Parses and validates pagination query parameters
 */
export function parsePaginationQuery(
  query: PaginationQuery,
  config: PaginationConfig = {}
): PaginationResult {
  const {
    sortingKeys,
    filterKeys,
    defaultSortingKey,
    maxLimit,
    defaultLimit,
  } = { ...DEFAULT_CONFIG, ...config }

  // Parse and validate page number
  const computedPage = parseInt(String(query.page || 1))
  const page = computedPage < 1 ? 1 : computedPage

  // Parse and validate limit
  const computedLimit = parseInt(String(query.limit || defaultLimit))
  const limit = computedLimit > maxLimit ? maxLimit : computedLimit < 1 ? defaultLimit : computedLimit

  // Calculate skip value for database query
  const skip = (page - 1) * limit

  // Parse sorting parameters
  const sortingDirection: SortDirection = 
    query.sortValue?.toLowerCase() === 'asc' ? 'ASC' : 'DESC'
  
  const sortingKey = sortingKeys.includes(query.sortKey || '')
    ? query.sortKey!
    : defaultSortingKey

  // Parse filter parameters
  const filterKey = filterKeys.includes(query.filterKey || '')
    ? query.filterKey
    : undefined
  
  const filterValue = query.filterValue || undefined

  // Parse date range
  const fromDate = query.from_date
    ? `${formatDateInSql(query.from_date)} 00:00:00`
    : undefined
  
  const toDate = query.to_date
    ? `${formatDateInSql(query.to_date)} 23:59:59`
    : undefined

  return {
    page,
    limit,
    skip,
    sortingDirection,
    sortingKey,
    filterKey,
    filterValue,
    fromDate,
    toDate
  }
}

/**
 * Formats paginated data into standardized response
 */
export function formatPaginationResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginationResponse<T> {
  return {
    totalPages: Math.ceil(total / limit),
    numberOfRows: data.length,
    currentPage: page,
    limit,
    totalRecords: total,
    paginatedResults: data,
  }
}

// Export types for use in other files
export type {
  PaginationConfig,
  PaginationQuery,
  PaginationResult,
  PaginationResponse,
  SortDirection,
}
