export const LOGIN_TOKEN = 'login/token'

//角色常量

export enum userRole {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
  VIP = 'vip',
}

export const PIC_REVIEW_STATUS_ENUM = {
  REVIEWING: 0,
  PASS: 1,
  REJECT: 2,
}

export const PIC_REVIEW_STATUS_MAP = {
  0: '待审核',
  1: '通过',
  2: '拒绝',
}

export const PIC_REVIEW_STATUS_OPTIONS = Object.keys(PIC_REVIEW_STATUS_MAP).map((key) => {
  return {
    label: PIC_REVIEW_STATUS_MAP[key] as string,
    value: key,
  }
})

// 空间级别枚举
export const SPACE_LEVEL_ENUM = {
  COMMON: 0,
  PROFESSIONAL: 1,
  FLAGSHIP: 2,
} as const

// 空间级别文本映射
export const SPACE_LEVEL_MAP: Record<number, string> = {
  0: '普通版',
  1: '专业版',
  2: '旗舰版',
}

// 空间级别选项映射
export const SPACE_LEVEL_OPTIONS = Object.keys(SPACE_LEVEL_MAP).map((key) => {
  const value = Number(key) // Convert string key to number
  return {
    label: SPACE_LEVEL_MAP[value],
    value,
  }
})
// 空间类型枚举
export const SPACE_TYPE_ENUM = {
  PRIVATE: 0,
  TEAM: 1,
}

// 空间类型文本映射
export const SPACE_TYPE_MAP: Record<number, string> = {
  0: '私有空间',
  1: '团队空间',
}

// 空间类型选项映射
export const SPACE_TYPE_OPTIONS = Object.keys(SPACE_TYPE_MAP).map((key) => {
  const value = Number(key) // 将字符串 key 转换为数字
  return {
    label: SPACE_TYPE_MAP[value],
    value,
  }
})

// 空间角色枚举
export const SPACE_ROLE_ENUM = {
  VIEWER: 'viewer',
  EDITOR: 'editor',
  ADMIN: 'admin',
} as const

// 空间角色文本映射
export const SPACE_ROLE_MAP: Record<string, string> = {
  viewer: '浏览者',
  editor: '编辑者',
  admin: '管理员',
}

// 空间角色选项映射
export const SPACE_ROLE_OPTIONS = Object.keys(SPACE_ROLE_MAP).map((key) => {
  return {
    label: SPACE_ROLE_MAP[key],
    value: key,
  }
})

/**
 * 空间权限常量
 */
export const SPACE_PERMISSION_ENUM = {
  SPACE_USER_MANAGE: 'spaceUser:manage',
  PICTURE_VIEW: 'picture:view',
  PICTURE_UPLOAD: 'picture:upload',
  PICTURE_EDIT: 'picture:edit',
  PICTURE_DELETE: 'picture:delete',
} as const

// 图片编辑类型及作用
export const PICTURE_EDIT_MESSAGE_TYPE_ENUM = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  ENTER_EDIT: 'ENTER_EDIT',
  EXIT_EDIT: 'EXIT_EDIT',
  EDIT_ACTION: 'EDIT_ACTION',
}

export const PICTURE_EDIT_MESSAGE_TYPE_MAP = {
  INFO: '发送通知',
  ERROR: '发送错误',
  ENTER_EDIT: '进入编辑状态',
  EXIT_EDIT: '退出编辑状态',
  EDIT_ACTION: '执行编辑操作',
}

export const PICTURE_EDIT_ACTION_ENUM = {
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
  ROTATE_LEFT: 'ROTATE_LEFT',
  ROTATE_RIGHT: 'ROTATE_RIGHT',
}

export const PICTURE_EDIT_ACTION_MAP = {
  ZOOM_IN: '放大操作',
  ZOOM_OUT: '缩小操作',
  ROTATE_LEFT: '左旋操作',
  ROTATE_RIGHT: '右旋操作',
}
