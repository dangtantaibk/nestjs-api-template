import { SetMetadata } from '@nestjs/common';

/**
 * Decorator để xác định các quyền cần thiết cho một route
 * @param permissions Danh sách các quyền cần có để truy cập endpoint
 * @example
 * ```typescript
 * @Permissions('user:read')
 * @Get()
 * findAll() {
 *   // Chỉ người dùng có quyền 'user:read' mới có thể truy cập
 * }
 * 
 * @Permissions('user:read', 'user:write')
 * @Post()
 * create() {
 *   // Chỉ người dùng có cả quyền 'user:read' và 'user:write' mới có thể truy cập
 * }
 * ```
 */
export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);