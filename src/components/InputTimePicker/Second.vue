<template>
  <div class="year-box">
    <div class="year-box-content">
      <div
        :class="['scroll-box', type === 'hour' ? 'active' : '']"
        @mousewheel.prevent="onHourMouseWhell"
      >
        <ul
          ref="hourScroll"
          :style="{ transform: `translateY(${hourScrollData}px)` }"
          class="animate"
        >
          <li v-for="(i, index) in hour" :key="index">{{ i }}</li>
        </ul>
        <div class="top-mask"></div>
        <div class="bottom-mask"></div>
        <div class="data-border"></div>
      </div>
      <div
        :class="['scroll-box', type === 'minute' ? 'active' : '']"
        ref="minuteDom"
        @mousewheel.prevent="onMinuteMouseWhell"
      >
        <ul
          :style="{ transform: `translateY(${minuteScrollData}px)` }"
          class="animate"
        >
          <li v-for="(i, index) in minute" :key="index">{{ i }}</li>
        </ul>
        <div class="top-mask"></div>
        <div class="bottom-mask"></div>
        <div class="data-border"></div>
      </div>
      <div
        :class="['scroll-box', type === 'second' ? 'active' : '']"
        ref="secondDom"
        @mousewheel.prevent="onSecondMouseWhell"
      >
        <ul
          :style="{ transform: `translateY(${secondScrollData}px)` }"
          class="animate"
        >
          <li v-for="(i, index) in minute" :key="index">{{ i }}</li>
        </ul>
        <div class="top-mask"></div>
        <div class="bottom-mask"></div>
        <div class="data-border"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { getTimeNumber, getTimeArr } from "./utils.js";
const props = defineProps({
  type: {
    type: String,
  },
  timeData: {
    type: Object,
  },
});
let hourScrollData = ref(-40);
let minuteScrollData = ref(-40);
let secondScrollData = ref(-40);
let hour = ref([20, 21, 22, 23, "00"]);
let minute = ref([56, 57, 58, 59, "00"]);
const onHourMouseWhell = (e) => {
  if (Number.isNaN(minuteScrollData.value)) {
    hourScrollData.value = -40;
  }
  if (e.wheelDelta > 0) {
    hourScrollData.value += 40;
    if (hourScrollData.value === 0) {
      hourScrollData.value = -960;
    }
  } else if (e.wheelDelta < 0) {
    hourScrollData.value -= 40;
    if (hourScrollData.value === -1000) {
      hourScrollData.value = -40;
    }
  }
  // eslint-disable-next-line vue/no-mutating-props
  props.timeData.hour = getTimeArr(Math.abs(hourScrollData.value) / 40 - 1);
};
const onMinuteMouseWhell = (e) => {
  if (Number.isNaN(minuteScrollData.value)) {
    minuteScrollData.value = -40;
  }
  if (e.wheelDelta > 0) {
    minuteScrollData.value += 40;
    if (minuteScrollData.value === 0) {
      minuteScrollData.value = -2400;
    }
  } else if (e.wheelDelta < 0) {
    minuteScrollData.value -= 40;
    if (minuteScrollData.value === -2440) {
      minuteScrollData.value = -40;
    }
  }
  // eslint-disable-next-line vue/no-mutating-props
  props.timeData.minute = getTimeArr(Math.abs(minuteScrollData.value) / 40 - 1);
};
const onSecondMouseWhell = (e) => {
  if (Number.isNaN(secondScrollData.value)) {
    secondScrollData.value = -40;
  }
  if (e.wheelDelta > 0) {
    secondScrollData.value += 40;
    if (secondScrollData.value === 0) {
      secondScrollData.value = -2400;
    }
  } else if (e.wheelDelta < 0) {
    secondScrollData.value -= 40;
    if (secondScrollData.value === -2440) {
      secondScrollData.value = -40;
    }
  }
  // eslint-disable-next-line vue/no-mutating-props
  props.timeData.second = getTimeArr(Math.abs(secondScrollData.value) / 40 - 1);
};
onBeforeMount(() => {
  for (let i = 1; i < 24; i++) {
    hour.value.push(i >= 10 ? i : "0" + i);
  }
  hour.value = hour.value.concat(["00", "01", "02", "03"]);
  for (let i = 1; i < 60; i++) {
    minute.value.push(i >= 10 ? i : "0" + i);
  }
  minute.value = minute.value.concat(["00", "01", "02", "03"]);
});
watch(
  () => props.timeData.hour,
  (n) => {
    hourScrollData.value = -(Math.abs(getTimeNumber(n)) + 1) * 40;
  },
  {
    immediate: true,
    deep: true,
  }
);
watch(
  () => props.timeData.minute,
  (n) => {
    minuteScrollData.value = -(Math.abs(getTimeNumber(n)) + 1) * 40;
  },
  {
    immediate: true,
    deep: true,
  }
);
watch(
  () => props.timeData.second,
  (n) => {
    secondScrollData.value = -(Math.abs(getTimeNumber(n)) + 1) * 40;
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped lang="scss">
.year-box {
  position: absolute;
  top: 40px;
  left: 0px;
  width: 100%;
  height: 280px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  &-content {
    height: 100%;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    .scroll-box.active {
      .top-mask,
      .bottom-mask {
        background-color: rgba(51, 154, 240, 0.1);
      }
      .data-border {
        border-color: rgba(51, 154, 240, 1);
      }
    }
    .scroll-box {
      position: relative;
      margin: 0 2px;
      overflow: hidden;

      &:hover {
        .top-mask,
        .bottom-mask {
          background-color: rgba(51, 154, 240, 0.1);
        }
        .data-border {
          border-color: rgba(51, 154, 240, 1);
        }
      }
      .animate {
        transition: all 0.3s ease-in-out;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          text-align: center;
          height: 40px;
          line-height: 40px;
        }
      }
      .top-mask {
        position: absolute;
        top: 0px;
        height: 115px;
        width: 100%;
      }
      .bottom-mask {
        position: absolute;
        bottom: 0px;
        height: 115px;
        width: 100%;
      }
      .data-border {
        position: absolute;
        inset: 115px 0px;
        height: 40px;
        border-top: 1px solid #ced4da;
        border-bottom: 1px solid #ced4da;
        box-sizing: border-box;
      }
    }
  }
}
</style>
