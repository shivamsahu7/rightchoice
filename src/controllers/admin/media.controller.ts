import { MediaDirectoryModel } from '../../models/media-directory.model';
import { sendSuccess, sendError } from '../../utils/response.helper';

export const listMediaDirectories = async ({ query, error, set }: any) => {
  try {
    // Parse pagination params, providing defaults
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      MediaDirectoryModel.findAll(limit, offset),
      MediaDirectoryModel.count()
    ]);

    return sendSuccess({ set }, 'Media directories retrieved successfully', {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (e) {
    return sendError({ set }, 'Failed to fetch media directories', {}, 500);
  }
};