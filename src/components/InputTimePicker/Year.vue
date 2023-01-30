<template>
  <div class="year-box">
    <div class="year-box-header">{{ getTimeNumber(timeData.year) }}年</div>
    <div class="year-box-content">
      <div
        @click.stop="hanleTabClick(getTimeNumber(cloneTimeData.year) - 3)"
        :class="{
          'year-box-content-active':
            getTimeNumber(timeData.year) ===
            getTimeNumber(cloneTimeData.year) - 3,
        }"
      >
        {{ getTimeNumber(cloneTimeData.year) - 3 }}
      </div>
      <div
        @click.stop="hanleTabClick(getTimeNumber(cloneTimeData.year) - 2)"
        :class="{
          'year-box-content-active':
            getTimeNumber(timeData.year) ===
            getTimeNumber(cloneTimeData.year) - 2,
        }"
      >
        {{ getTimeNumber(cloneTimeData.year) - 2 }}
      </div>
      <div
        @click.stop="hanleTabClick(getTimeNumber(cloneTimeData.year) - 1)"
        :class="{
          'year-box-content-active':
            getTimeNumber(timeData.year) ===
            getTimeNumber(cloneTimeData.year) - 1,
        }"
      >
        {{ getTimeNumber(cloneTimeData.year) - 1 }}
      </div>
      <div
        @click.stop="hanleTabClick(getTimeNumber(cloneTimeData.year))"
        :class="{
          'year-box-content-active':
            getTimeNumber(timeData.year) === getTimeNumber(cloneTimeData.year),
        }"
      >
        {{ getTimeNumber(cloneTimeData.year) }}
      </div>
      <div
        @click.stop="hanleTabClick(getTimeNumber(cloneTimeData.year) + item)"
        v-for="item of 12"
        :key="item"
        :class="{
          'year-box-content-active':
            getTimeNumber(timeData.year) ===
            getTimeNumber(cloneTimeData.year) + item,
        }"
      >
        {{ getTimeNumber(cloneTimeData.year) + item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { getTimeNumber, getTimeArr } from "./utils.js";
const props = defineProps({
  timeData: {
    type: Object,
  },
  cloneTimeData: {
    type: Object,
  },
});
watch(
  () => props.timeData.year,
  () => {
    if (
      getTimeNumber(props.timeData.year) >
      getTimeNumber(props.cloneTimeData.year) + 12
    ) {
      // eslint-disable-next-line vue/no-mutating-props
      props.cloneTimeData.year = getTimeArr(
        getTimeNumber(props.cloneTimeData.year) + 16
      );
    } else if (
      getTimeNumber(props.timeData.year) <
      getTimeNumber(props.cloneTimeData.year) - 3
    ) {
      // eslint-disable-next-line vue/no-mutating-props
      props.cloneTimeData.year = getTimeArr(
        getTimeNumber(props.cloneTimeData.year) - 16
      );
    }
  }
);
const hanleTabClick = (data) => {
  if (getTimeNumber(props.timeData.year) !== data) {
    // eslint-disable-next-line vue/no-mutating-props
    props.timeData.year =
      data <= 1000 ? getTimeArr(1000, 4) : getTimeArr(data, 4);
  }
};
</script>

<style scoped lang="scss">
.year-box {
  position: absolute;
  top: 40px;
  left: 0px;
  width: 100%;
  height: 280px;
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
