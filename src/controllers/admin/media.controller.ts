import { MediaDirectoryModel } from '../../models/media-directory.model';

export const listMediaDirectories = async ({ query, error }: any) => {
  try {
    // Parse pagination params, providing defaults
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      MediaDirectoryModel.findAll(limit, offset),
      MediaDirectoryModel.count()
    ]);

    return {
      message: 'Media directories retrieved successfully',
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (e) {
    return error(500, { message: 'Failed to fetch media directories' });
  }
};