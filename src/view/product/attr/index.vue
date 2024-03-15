<template>
  <div class="attrs_container">
    <el-card shadow="hover">
      <template #header>
        <div>分类选择</div>
      </template>
      <Category
        :disable="editAttrData.id !== undefined"
        v-model="fromdata"
        :list="list"
        @change="selectChange"
      >
        <template #handel="{ form }">
          <el-button @click="resetForm(form)">重 置</el-button>
        </template>
      </Category>
    </el-card>
    <el-card shadow="hover" class="table_card">
      <template #header>
        <transition
          :name="editAttrData.id !== undefined ? 'fade' : 'fadeout'"
          mode="out-in"
        >
          <div
            v-if="editAttrData.id === undefined"
            style="
              justify-content: space-between;
              display: flex;
              align-items: center;
            "
          >
            <span>属性信息</span>
            <el-button
              type="primary"
              :disabled="!fromdata.category3Id"
              icon="Plus"
              @click="addAttrList"
              >新增平台属性</el-button
            >
          </div>
          <div
            v-else
            style="
              justify-content: space-between;
              display: flex;
              align-items: center;
            "
          >
            <span>属性值信息</span>
          </div>
        </transition>
      </template>
      <!-- <div slot="header"></div> -->
      <transition
        :name="editAttrData.id !== undefined ? 'fade' : 'fadeout'"
        mode="out-in"
      >
        <el-table
          v-if="editAttrData.id === undefined"
          stripe
          border
          :data="attrList"
          style="width: 100%"
          height="100%"
        >
          <el-table-column prop="prop" label="序号" width="100" align="center">
            <template #="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" align="center">
            <template #="{ row }">
              <el-tag
                type="success"
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200" align="center">
            <template #="{ row }">
              <el-button
                type="primary"
                icon="Edit"
                circle
                @click="editAttr(row)"
              />
              <el-popconfirm
                :title="`确认要删除属性 [${row.attrName}] 吗`"
                @confirm="delAttr(row.id)"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete" circle />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

          <template #empty>
            <el-empty description="暂无数据" />
          </template>
        </el-table>
        <div class="edit_attr" v-else>
          <div class="edit_handel">
            <div class="edit_input">
              <label for="attrName">属性名称</label>
              <el-input
                id="attrName"
                v-model="editAttrData.attrName"
                placeholder=""
                style="width: 200px; margin-left: 10px"
              ></el-input>
            </div>
            <div class="btns">
              <el-button
                type="primary"
                icon="Plus"
                @click="addAttreData"
                :disabled="
                  !lastData.valueName && editAttrData.attrValueList.length > 0
                "
                >添加属性值
              </el-button>
              <el-button
                type="primary"
                icon="Check"
                @click="saveAttrData"
                :disabled="
                  !lastData.valueName ||
                  !editAttrData.attrValueList.length ||
                  !editAttrData.attrName
                "
              >
                保 存
              </el-button>
              <el-button type="warning" @click="editAttrData = {}">
                取 消
              </el-button>
            </div>
          </div>
          <el-table
            border
            stripe
            :data="editAttrData.attrValueList"
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column
              type="index"
              label="序号"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="valueName" label="属性值名称" align="center">
              <template #="{ row, $index }">
                <p
                  v-if="!row.edit"
                  @click="edit(row, $index)"
                  style="cursor: pointer"
                >
                  {{ row.valueName }}
                </p>
                <el-input
                  :ref="(r: any) => (inputRef[$index] = r)"
                  @blur="inputBlur(row)"
                  v-else
                  v-model="row.valueName"
                  @change="inputChange($event)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template #="{ row }">
                <el-button
                  type="danger"
                  icon="Delete"
                  circle
                  @click="delAttrValue(row.id)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </transition>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, computed } from "vue";
import {
  reqGetCategory,
  reqGetAttrInfoList,
  reqSaveAttrInfo,
  reqDeleteAttr,
} from "@/api/product/attr/index.ts";
import {
  AttrListParams,
  AttrData,
  List,
  AttrValue,
} from "@/api/product/attr/type";
import { FormInstance } from "element-plus";
// 表单数据
const fromdata = reactive<AttrListParams>({
  category1Id: null,
  category2Id: null,
  category3Id: null,
});
const list = reactive<List>({
  category1: [],
  category2: [],
  category3: [],
});
const editAttrData = ref<any>({}); // 编辑数据
const attrList = ref<AttrData[]>([]); // 属性列表
const inputRef = reactive<any>([]); // 属性值输入框
// 获取分类
const getCategory = (category: number, id?: number) => {
  reqGetCategory({ category, id }).then((res) => {
    list["category" + category] = res.data;
  });
};
// 获取属性列表
const getAttrInfo = () => {
  reqGetAttrInfoList(fromdata).then((res) => {
    attrList.value = res.data;
  });
};
// 选择器选中
const selectChange = (id: number, category: number) => {
  switch (category) {
    case 1:
      getCategory(category + 1, id);
      break;
    case 2:
      getCategory(category + 1, id);
      break;
    case 3:
      getAttrInfo();
      break;

    default:
      break;
  }
  editAttrData.value = {};
};
// 修改
const editAttr = (_row: any) => {
  editAttrData.value = JSON.parse(JSON.stringify(_row));
};
// 阐述
const delAttr = (attrId: number) => {
  reqDeleteAttr({ attrId }).then(() => {
    getAttrInfo();
  });
};
// /重置表单
const resetForm = (formRef: FormInstance) => {
  formRef?.resetFields();
  attrList.value = [];
};
// 删除参数值名称
const delAttrValue = (id: number) => {
  editAttrData.value.attrValueList = editAttrData.value.attrValueList.filter(
    (f: any) => f.id !== id,
  );
};
// 点击属性名编辑
const edit = (row: any, index: number) => {
  row.edit = true;
  nextTick(() => {
    inputRef[index].focus();
  });
};
// 保存属性
const saveAttrData = () => {
  editAttrData.value.id == null && delete editAttrData.value.id;
  reqSaveAttrInfo(editAttrData.value)
    .then(() => {
      ElMessage.success("保存成功");
      getAttrInfo();
    })
    .finally(() => {
      editAttrData.value = {};
    });
};
// 失去焦点
const inputBlur = (row: any) => {
  if (row.edit) {
    delete row.edit;
  }
  !lastData.value.valueName && editAttrData.value.attrValueList.pop();
};
// 输入框变化
const inputChange = (ev: any) => {
  console.log(ev, "ev");
  if (ev) {
    return;
  }
  editAttrData.value = {
    ...editAttrData.value,
    attrValueList: editAttrData.value.attrValueList.filter(
      (f: any) => f.valueName,
    ),
  };
};
// 获取最后一个属性值
const lastData = computed<AttrValue | Record<string, never>>(() => {
  if (editAttrData.value.attrValueList) {
    return editAttrData.value.attrValueList.slice(-1)[0] || {};
  } else {
    return {};
  }
});
// 新增属性值
const addAttreData = () => {
  if (
    !lastData.value?.valueName &&
    editAttrData.value.attrValueList.length > 0
  ) {
    ElMessage.error("属性值不能为空");
    return;
  }
  editAttrData.value.attrValueList = [
    ...editAttrData.value.attrValueList,
    { edit: true },
  ];
  const index = editAttrData.value.attrValueList.length - 1;
  nextTick(() => {
    inputRef[index].focus();
  });
};
// 添加平台属性
const addAttrList = () => {
  editAttrData.value = {
    id: null,
    categoryId: fromdata.category3Id,
    categoryLevel: 3,
    attrValueList: [],
  };
};
getCategory(1);
</script>

<style scoped lang="scss">
.attrs_container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: 16px;
  }

  ::v-deep(.table_card) {
    margin-top: 10px;
    flex: auto;
    display: flex;
    flex-direction: column;
    height: 0;
    .el-card__body {
      overflow: auto;
      height: 100%;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition:
        opacity 0.5s,
        transform 0.5s;
    }

    .fadeout-enter-active,
    .fadeout-leave-active {
      transition:
        opacity 0.5s,
        transform 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
      transform: translateX(-100%);
    }

    .fade-enter-to,
    .fade-leave {
      opacity: 1;
      transform: translateX(0);
    }

    .fadeout-enter,
    .fadeout-leave-to {
      opacity: 0;
      transform: translateX(100%);
    }

    .fadeout-enter-to,
    .fadeout-leave {
      opacity: 1;
      transform: translateX(0);
    }

    .edit_attr {
      .edit_handel {
        display: flex;
        justify-content: space-between;

        .edit_input {
          display: flex;
          align-items: center;

          > label {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
