<template>
  <div class="year-box">
    <div class="year-box-header">{{ getTimeNumber(timeData.day) }}日</div>
    <div class="year-box-content">
      <!-- <div
        @click.stop="hanleTabClick(item)"
        :class="{ 'year-box-content-active': getTimeNumber(timeData.day) === item }"
        v-for="item of dateLong"
        :key="item"
      >
        {{ item }}
      </div> -->
      <table width="100%">
        <tr>
          <th>周日</th>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th>周六</th>
        </tr>
        <tr v-for="(item, index) of dateList" :key="index">
          <td
            @click="handleGetDate(item1.date, item1.currentMonth)"
            v-for="(item1, index) of item"
            :key="index"
            :class="{
              notCurrentMonth: !item1.currentMonth,
              currentDay: isCurrentDay(item1.date, item1.currentMonth),
            }"
          >
            {{ item1.date }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { getTimeNumber, getTimeArr } from "./utils.js";
const props = defineProps({
  timeData: {
    type: Object,
    default: () => ({}),
  },
});
// const hanleTabClick = (data) => {
//   // eslint-disable-next-line vue/no-mutating-props

//   props.timeData.day = getTimeArr(data);
// };
const Year = computed(() => {
  return getTimeNumber(props.timeData.year);
});
const Month = computed(() => {
  return getTimeNumber(props.timeData.mounth);
});
const dateList = computed(() => {
  let DateList = [];
  //选中月份长度
  const dateLong = new Date(Year.value, Month.value, 0).getDate();
  //选中第天题周几
  const startDays = new Date(Year.value, Month.value - 1, 1).getDay();
  //最后一天周几
  const endDays = new Date(Year.value, Month.value - 1, dateLong).getDay();
  //上个月份长度
  const beforeDateLong = new Date(Year.value, Month.value - 1, 0).getDate();
  Array.from({ length: dateLong }, (v, index) => {
    DateList.push({ date: index + 1, currentMonth: true });
  });
  //往前填充
  // for (let i = 0; i < startDays; i++) {
  //   DateList.unshift({ date: beforeDateLong - i, currentMonth: false });
  // }
  // //后部填充
  // for (let i = 0; i < 7 - endDays - 1; i++) {
  //   DateList.push({ date: i + 1, currentMonth: false });
  // }
  for (let i = 0; i < startDays; i++) {
    DateList.unshift({ date: "", currentMonth: false });
  }
  //后部填充
  for (let i = 0; i < 7 - endDays - 1; i++) {
    DateList.push({ date: "", currentMonth: false });
  }
  //不够6行填充
  // if (DateList.length === 35) {
  //   for (let i = 7 - endDays; i < 14 - endDays; i++)
  //     DateList.push({ date: i, currentMonth: false });
  // }

  const resultData = [];
  const times = Math.ceil(DateList.length / 7);
  for (let i = 0; i < times; i++) {
    resultData.push(DateList.slice(i * 7, (i + 1) * 7));
  }
  return resultData;
});
const isCurrentDay = (date, current) => {
  return date === getTimeNumber(props.timeData.day);
};
const handleGetDate = (date, c) => {
  if (!c) return;
  // eslint-disable-next-line vue/no-mutating-props
  props.timeData.day = getTimeArr(date);
};
</script>

<style scoped lang="scss">
.year-box {
  position: absolute;
  top: 40px;
  left: 0px;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  &-header {
    height: 35px;
    box-sizing: border-box;
    padding: 0 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e5e5ee;
  }
  &-content {
    table {
      td {
        text-align: center;
        height: 30px;
      }
      .notCurrentMonth {
        color: grey;
      }
      .currentDay {
        background-color: #5199a1;
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>
