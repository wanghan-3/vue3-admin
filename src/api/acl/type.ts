import { ListRes } from "@/api/type";
export interface UserItem {
  createTime: string;
  id: number;
  name: string;
  password: string;
  phone: string | null;
  roleName: string;
  updateTime: string;
  username: string;
}
export interface UserList extends ListRes {
  records: UserItem[];
}
export interface RoleItem {
  createTime: string;
  id: number;
  remark: null | string;
  roleName: string;
  updateTime: string;
}
export interface RoleList extends ListRes {
  records: RoleItem[];
}
export interface PermissionInfo {
  code: null | string;
  createTime: string;
  id: number;
  level: number;
  name: string;
  pid: number;
  select: boolean;
  status: null | string;
  toCode: null | string;
  type: number;
  updateTime: string;
  children?: PermissionInfo[];
}
