<template>
  <div class="year-box">
    <div class="year-box-header">
      {{ mounthMap[getTimeNumber(timeData.mounth) - 1] }}月
    </div>
    <div class="year-box-content">
      <div
        @click.stop="hanleTabClick(1)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 1,
        }"
      >
        一月
      </div>
      <div
        @click.stop="hanleTabClick(2)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 2,
        }"
      >
        二月
      </div>
      <div
        @click.stop="hanleTabClick(3)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 3,
        }"
      >
        三月
      </div>
      <div
        @click.stop="hanleTabClick(4)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 4,
        }"
      >
        四月
      </div>
      <div
        @click.stop="hanleTabClick(5)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 5,
        }"
      >
        五月
      </div>
      <div
        @click.stop="hanleTabClick(6)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 6,
        }"
      >
        六月
      </div>
      <div
        @click.stop="hanleTabClick(7)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 7,
        }"
      >
        七月
      </div>
      <div
        @click.stop="hanleTabClick(8)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 8,
        }"
      >
        八月
      </div>
      <div
        @click.stop="hanleTabClick(9)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 9,
        }"
      >
        九月
      </div>
      <div
        @click.stop="hanleTabClick(10)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 10,
        }"
      >
        十月
      </div>
      <div
        @click.stop="hanleTabClick(11)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 11,
        }"
      >
        十一月
      </div>
      <div
        @click.stop="hanleTabClick(12)"
        :class="{
          'year-box-content-active': getTimeNumber(timeData.mounth) === 12,
        }"
      >
        十二月
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTimeNumber, getTimeArr } from "./utils.js";
const props = defineProps({
  timeData: {
    type: Object,
  },
});
const mounthMap = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "十一",
  "十二",
];
const hanleTabClick = (data) => {
  if (getTimeNumber(props.timeData.mounth) !== data) {
    // eslint-disable-next-line vue/no-mutating-props
    props.timeData.mounth = getTimeArr(data);
  }
};
</script>

<style scoped lang="scss">
.year-box {
  position: absolute;
  top: 40px;
  left: 0px;
  width: 100%;
  height: 230px;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    > div {
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    &-active {
      background-color: #5199a1;
      color: #fff;
    }
  }
}
</style>
