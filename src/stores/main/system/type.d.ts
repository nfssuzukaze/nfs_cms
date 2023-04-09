export interface IUsersListItem {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface ISystemState {
  usersList: IUsersListItem[]
  usersTotalCount: number
}

export interface ISearchForm {
  // [key: string]: string | number | object[]
  user: string
  realname: string
  cellphone: string
  enable: number
  createAt: object[]
}

export type IPostUsersListData = {
  offset: number
  size: number
} & Partial<ISearchForm>
