// 分类数据类型
export interface CategoryType {
  id: number;
  name: string;
}
export type CategoryTypeRes = CategoryType[];

export type AttrListParams = {
  category1Id: number | null;
  category2Id: number | null;
  category3Id: number | null;
}; // 属性数据列表的参数
// 属性值列表
export interface AttrValue {
  attrId: number;
  id: number;
  valueName: string;
}
// 属性数据
export interface AttrData {
  attrName: string;
  attrValueList: AttrValue[];
  categoryId: number;
  categoryLevel: number;
  id: number;
}
// 类型
export interface List {
  [category1: string]: CategoryTypeRes | [];
  category2: CategoryTypeRes | [];
  category3: CategoryTypeRes | [];
}
