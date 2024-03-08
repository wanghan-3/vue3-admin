<template>
  <el-form :model="supFromData" label-width="100">
    <el-form-item label="SKU名称">
      <el-input placeholder="请输入SKU名称" v-model="supFromData.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="supFromData.fmid" placeholder="请选择SPU品牌">
        <el-option
          v-for="item in ['选项1', '选项2']"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="supFromData.supDev"
      />
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select placeholder="">
        <el-option
          v-for="item in ['选项1', '选项2']"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button style="margin-top: 10px" type="primary" icon="Plus">
        添加属性值
      </el-button>
      <el-table border stripe style="margin: 10px 0">
        <el-table-column align="center" type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column align="center" label="销售属性名字" width="120">
        </el-table-column>
        <el-table-column align="center" label="销售属性值" width="auto">
        </el-table-column>
        <el-table-column align="center" label="操作"> </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="default" @click="$emit('activeChange', 0)">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const supFromData = reactive<any>({});
</script>
<style scoped lang="scss"></style>
