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
