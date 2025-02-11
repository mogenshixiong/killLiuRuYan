/**
 * @description 是1/否0
 * @example import type { Bit } from '#/base'
 */
export enum Bit {
  /** 是 */
  true = 1,
  /** 否 */
  false = 0
}

/** 当前表单页面状态 */
// import type { FormType } from '#/base'
export enum FormType {
  /** 新增 */
  Add = 'add',
  /** 新增子级 */
  AddChild = 'addChild',
  /** 编辑 */
  Edit = 'edit',
  /** 审批 */
  Audit = 'audit',
  /** 查看 */
  View = 'view'
}
/**
 * @description 页面状态 options
 * @example import { FormTypeOptions } from '#/base'
 */
export const FormTypeOptions = [
  { value: FormType.Add, title: '新增' },
  { value: FormType.Edit, title: '编辑' },
  { value: FormType.Audit, title: '审批' },
  { value: FormType.View, title: '查看' }
]
/**
 * @description 性别1男2女
 * @example import type { Sex } from '#/base'
 */
export enum Sex {
  man = '1',
  woman = '2'
}
/**
 * @description 性别 options 1男2女
 * @example import { SexOptions } from '#/base'
 */
export const SexOptions = [
  { value: Sex.man, title: '男' },
  { value: Sex.woman, title: '女' }
]
/**
 * @description 分页
 * @example import { TQueryWrapper } from '#/base'
 */
export interface TQueryWrapper {
  /** 当前页码 */ pageNo: number
  /** 每一页显示数据条数 */ pageSize: number
}
