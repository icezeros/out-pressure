<template>
  <a-card :bordered="true">
    <!-- <component @onEdit="handleEdit" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component> -->
    <a-row>
      <a-col :span="12">col-12</a-col>
      <a-col :span="12">col-12</a-col>
    </a-row>
    <a-row>
      <a-col :span="12">col-12</a-col>
      <a-col :span="12">
        <a-row>
          col-12
        </a-row>
        <a-row>
          col-12
        </a-row>
      </a-col>
    </a-row>
    <p>sdfs</p>
  </a-card>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
import AInput from 'ant-design-vue/es/input/Input'
// 动态切换组件
import List from '@/views/list/table/List'
import Edit from '@/views/list/table/Edit'

export default {
  name: 'TableListWrapper',
  components: {
    AInput,
    ATextarea,
    List,
    Edit
  },
  data() {
    return {
      currentComponet: 'List',
      record: ''
    }
  },
  created() {},
  methods: {
    handleEdit(record) {
      this.record = record || ''
      this.currentComponet = 'Edit'
      console.log(record)
    },
    handleGoBack() {
      this.record = ''
      this.currentComponet = 'List'
    }
  },
  watch: {
    '$route.path'() {
      this.record = ''
      this.currentComponet = 'List'
    }
  }
}
</script>
