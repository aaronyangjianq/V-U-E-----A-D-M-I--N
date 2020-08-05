<template>
  <div class="users-box">
    <!-- 搜索筛选头部 -->
    <a-form 
      layout="inline" 
      :span="24"
      @submit="onFilterSubmit"
      style="background-color: #f0f0f0; padding: 16px; margin-top: 16px;">
      <a-form-item label="时间：">
        <a-range-picker
            separator="到"
            :show-time="false"
            format="YYYY-MM-DD"
            :placeholder="['开始时间', '结束时间']"
            @change="onchangeTime"
            style="width: 280px;"
        />
     </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 用户列表 -->
    <a-table 
      :columns="hour" 
      :data-source="hourList" 
      :pagination="pagination"
      :loading="isLoading"
      :rowKey="data => data.uid" 
      style="background-color: white; margin-top: 32px;" 
      @change="onTableChange">
      <template slot="action" slot-scope="text, data">
          <a-button type="link" @click="turnRecord(data.uid)" >查看打卡记录</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>

import { hour } from './configs/hour';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      hour: hour,
      isLoading: false,
      hourList: [],
      pagination: {},
      start: '',
      end: ''
    };
  },
  async created() {
      const rawData = await this.GetHourRank();
      this.hourList = rawData.result.list;
      this.pagination = rawData.result && rawData.result.page_info;
  },
  methods: {
    ...mapActions(['GetHourRank']),
    async onFilterSubmit() {
        const filterInfo = {
          start: this.start,
          end: this.end
        };
        const rawData = await this.GetHourRank(filterInfo);
        this.hourList = rawData.result.list;
        this.pagination = rawData.result && rawData.result.page_info;
    },
    onChange() {

    },
    onTableChange() {

    },
    onchangeTime(dateAdd, dateAddString) {
      this.start = dateAddString[0].split('-').join('');
      this.end = dateAddString[1].split('-').join('');
    },
    turnRecord(uid) {
      this.$router.push({ path: '/users/signrecord/' + uid });
    }
  }
};
</script>

<style lang="less" scoped>
  .users-box {
    padding: 16px 32px;
    background-color: white;
  }
</style>
