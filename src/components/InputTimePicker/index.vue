<template>
  <div :class="['time-box', { 'time-box-disabled': disable }]" ref="timeBox">
    <div
      :class="['time-picker', { boxActive: boxActive }]"
      @click="handlePickerClick($event)"
    >
      <div :class="{ active: type === 'year' }" type="year">
        {{ timeData.year.join("") }}
      </div>
      <span>/</span>
      <div :class="{ active: type === 'mounth' }" type="mounth">
        {{ timeData.mounth.join("") }}
      </div>
      <span>/</span>
      <div :class="{ active: type === 'day' }" type="day">
        {{ timeData.day.join("") }}
      </div>
      <div
        class="time-picker-time"
        v-if="format === 'YYYY-MM-DD hh:mm:ss' || format === 'YYYY-MM-DD hh:mm'"
      >
        <div :class="{ active: type === 'hour' }" type="hour">
          {{ timeData.hour.join("") }}
        </div>
        <span
          v-if="
            format === 'YYYY-MM-DD hh:mm:ss' || format === 'YYYY-MM-DD hh:mm'
          "
          >:</span
        >
        <div
          :class="{ active: type === 'minute' }"
          type="minute"
          v-if="
            format === 'YYYY-MM-DD hh:mm:ss' || format === 'YYYY-MM-DD hh:mm'
          "
        >
          {{ timeData.minute.join("") }}
        </div>
        <span v-if="format === 'YYYY-MM-DD hh:mm:ss'">:</span>
        <div
          :class="{ active: type === 'second' }"
          type="second"
          v-if="format === 'YYYY-MM-DD hh:mm:ss'"
        >
          {{ timeData.second.join("") }}
        </div>
      </div>
      <div class="time-icon">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          v-if="!modelValue"
        >
          <path
            fill="currentColor"
            d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
          ></path>
        </svg>
        <span
          v-if="modelValue && !disable"
          class="time-close"
          @click.stop="onClosePicker(true)"
        >
          <svg
            viewBox="0 0 14 14"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0"
              y="6"
              width="14"
              height="2"
              fill="grey"
              transform="rotate(45,7,7)"
            />
            <rect
              x="6"
              y="0"
              width="2"
              height="14"
              fill="grey"
              transform="rotate(45,7,7)"
            />
          </svg>
        </span>
      </div>
    </div>

    <component
      :is="comType"
      style="margin: 0px; background: #fff; z-index: 99999"
      :timeData="timeData"
      :dateLong="dateLong"
      :cloneTimeData="cloneTimeData"
      :type="type"
      @mousewheel.prevent
    />
  </div>
</template>
<script>
import year from "./Year.vue";
import mounth from "./Mounth.vue";
import day from "./Day.vue";
import second from "./Second.vue";
export default {
  name: "b-input-timepicker",
  components: {
    year,
    mounth,
    day,
    second,
  },
};
</script>
<script setup>
import {
  onBeforeUnmount,
  onMounted,
  ref,
  computed,
  reactive,
  watch,
  toRef,
  nextTick,
} from "vue";
import { getTimeArr, getTimeNumber, getTimePadString } from "./utils.js";
const emits = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  format: {
    type: String,
    default: "YYYY-MM-DD hh:mm:ss",
  },
  modelValue: {
    type: String,
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

const type = ref(null);
const inputArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const typeArr = ref(["year", "mounth", "day", "hour", "minute", "second"]);
const nextPreKey = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
let dateIndex = 0;
const boxActive = ref(false);
const timeBox = ref(null);
let timeData = reactive({
  year: ["-", "-", "-", "-"],
  mounth: ["-", "-"],
  day: ["-", "-"],
  hour: ["-", "-"],
  minute: ["-", "-"],
  second: ["-", "-"],
});
let cloneTimeData = ref();
const dateLong = computed(() => {
  return new Date(
    getTimeNumber(timeData.year),
    getTimeNumber(timeData.mounth),
    0
  ).getDate();
});
const dateMap = {
  year: ref(4),
  mounth: ref(12),
  day: dateLong,
  hour: ref(23),
  minute: ref(59),
  second: ref(59),
};
const dateMinMap = {
  mounth: ref(1),
  day: ref(1),
};
const comType = computed(() => {
  let map = ["hour", "minute", "second"];
  if (map.includes(type.value)) {
    return "second";
  } else {
    return type.value;
  }
});
const getResultData = (data) => {
  switch (props.format) {
    case "YYYY-MM-DD hh:mm:ss":
      return `${getTimePadString(timeData.year, 4)}-${getTimePadString(
        timeData.mounth
      )}-${getTimePadString(timeData.day)} ${getTimePadString(
        timeData.hour
      )}:${getTimePadString(timeData.minute)}:${getTimePadString(
        timeData.second
      )}`;
    case "YYYY-MM-DD hh:mm":
      return `${getTimePadString(timeData.year, 4)}-${getTimePadString(
        timeData.mounth
      )}-${getTimePadString(timeData.day)} ${getTimePadString(
        timeData.hour
      )}:${getTimePadString(timeData.minute)}`;
    case "YYYY-MM-DD hh:mm":
      return `${getTimePadString(timeData.year, 4)}-${getTimePadString(
        timeData.mounth
      )}-${getTimePadString(timeData.day)}`;
    default:
      return `${getTimePadString(timeData.year, 4)}-${getTimePadString(
        timeData.mounth
      )}-${getTimePadString(timeData.day)} ${getTimePadString(
        timeData.hour
      )}:${getTimePadString(timeData.minute)}:${getTimePadString(
        timeData.second
      )}`;
  }
};
const activeTypeArr = computed(() => {
  switch (props.format) {
    case "YYYY-MM-DD hh:mm:ss":
      return typeArr.value;
    case "YYYY-MM-DD hh:mm":
      return typeArr.value.slice(0, -1);
    case "YYYY-MM-DD":
      return typeArr.value.slice(0, 3);
    default:
      return typeArr.value;
  }
});
const handlePickerClick = (e) => {
  if (props.disable) return;
  boxActive.value = true;
  type.value = e.target.getAttribute("type");
  if (!type.value) {
    type.value = activeTypeArr.value[activeTypeArr.value.length - 1];
  }
  getDefaultDate[type.value](true, true);
};
const modelData = computed({
  get: () => props.modelValue,
  set: (e) => {
    emits("update:modelValue", e);
  },
});
const toNextType = () => {
  if (getTimeNumber(timeData.year) <= 1000) {
    timeData.year = getTimeArr(1000, 4);
  }
  let typeIndex = activeTypeArr.value.indexOf(type.value);
  if (activeTypeArr.value.length - 1 === typeIndex) {
    type.value = activeTypeArr.value[0];
    dateIndex = 0;
  } else {
    typeIndex++;
    type.value = activeTypeArr.value[typeIndex];
    dateIndex = 0;
  }
};
const yearRef = toRef(timeData, "year");
const mounthRef = toRef(timeData, "mounth");

const onKeyDown = (e) => {
  if (props.disable || !type.value) return;
  const { key } = e;
  const newKey = inputArr.concat(nextPreKey);
  const hasKey = newKey.includes(key);
  if (!hasKey) return;
  const isUtilKey = nextPreKey.includes(key);
  if (!isUtilKey) {
    const length = timeData[type.value].length;
    if (dateIndex < length) {
      timeData[type.value][dateIndex] = key;
      dateIndex++;
      if (dateIndex === length) {
        if (type.value === "year") {
          toNextType();
          return;
        }
        if (getTimeNumber(timeData[type.value]) > dateMap[type.value].value) {
          timeData[type.value] = getTimeArr(dateMap[type.value].value);
          toNextType();
        } else if (
          Object.keys(dateMinMap).includes(type.value) &&
          getTimeNumber(timeData[type.value]) < dateMinMap[type.value].value
        ) {
          timeData[type.value] = getTimeArr(dateMinMap[type.value].value);
          toNextType();
        } else {
          toNextType();
        }
      }
    } else {
      toNextType();
    }
  } else {
    e.preventDefault();
    dateIndex = 0;
    let typeIndex = activeTypeArr.value.indexOf(type.value);
    switch (key) {
      case "ArrowRight":
        toNextType();
        if (
          getTimeNumber(timeData[type.value]) > dateMap[type.value].value &&
          type.value !== "year"
        ) {
          timeData[type.value] = getTimeArr(dateMap[type.value].value);
        }

        break;
      case "ArrowLeft":
        if (typeIndex === 0) {
          type.value = activeTypeArr.value[activeTypeArr.value.length - 1];
        } else {
          type.value = activeTypeArr.value[--typeIndex];
        }
        if (
          getTimeNumber(timeData[type.value]) > dateMap[type.value].value &&
          type.value !== "year"
        ) {
          timeData[type.value] = getTimeArr(dateMap[type.value].value);
        }
        break;
      case "ArrowUp":
        getDefaultDate[type.value](true);
        break;
      case "ArrowDown":
        getDefaultDate[type.value](false);
        break;
    }
  }
};
const getDefaultDate = {
  year: (isUP, isGetTime) => {
    const hasEmpty = timeData.year.includes("-");
    if (hasEmpty) {
      const yearNow = new Date().getFullYear();
      timeData.year = getTimeArr(yearNow);
    } else {
      if (!isGetTime) {
        let year = getTimeNumber(timeData.year);
        isUP ? year++ : year--;
        timeData.year =
          year <= 1000 ? getTimeArr(1000, 4) : getTimeArr(year, 4);
      }
    }
  },
  mounth: (isUP, isGetTime) => {
    const hasEmpty = timeData.mounth.includes("-");
    const yearHasEmpty = timeData.year.includes("-");
    if (yearHasEmpty) {
      getDefaultDate.year();
    }
    if (hasEmpty) {
      const mounthNow = new Date().getMonth() + 1;
      timeData.mounth = getTimeArr(mounthNow);
    } else {
      if (!isGetTime) {
        let mounth = getTimeNumber(timeData.mounth);
        isUP ? mounth++ : mounth--;
        if (mounth === 13) {
          timeData.mounth = ["0", "1"];
          // getDefaultDate.year()   //年月日联动，暂时觉得不需要
        } else if (mounth === 0) {
          timeData.mounth = ["1", "2"];
        } else {
          timeData.mounth = getTimeArr(mounth);
        }
      }
    }
  },
  day: (isUP, isGetTime) => {
    const hasEmpty = timeData.day.includes("-");
    const mounthHasEmpty = timeData.mounth.includes("-");
    const yearHasEmpty = timeData.year.includes("-");
    if (yearHasEmpty) {
      getDefaultDate.year();
    }
    if (mounthHasEmpty) {
      getDefaultDate.mounth();
    }
    if (hasEmpty) {
      nextTick(() => {
        const dateNow = new Date().getDate();
        timeData.day = getTimeArr(dateNow);
      });
    } else {
      if (!isGetTime) {
        let day = getTimeNumber(timeData.day);
        isUP ? day++ : day--;
        if (day > dateLong.value) {
          timeData.day = ["0", "1"];
          //getDefaultDate.mounth()
        } else if (day === 0) {
          timeData.day = getTimeArr(dateLong.value);
        } else {
          timeData.day = getTimeArr(day);
        }
      }
    }
  },
  hour: (isUP, isGetTime) => {
    const hasEmpty = timeData.hour.includes("-");
    if (hasEmpty) {
      const hourNow = new Date().getHours();
      timeData.hour = getTimeArr(hourNow);
    } else {
      if (!isGetTime) {
        let hour = getTimeNumber(timeData.hour);
        isUP ? hour++ : hour--;
        if (hour === 24) {
          timeData.hour = ["0", "0"];
          // getDefaultDate.day()
        } else if (hour < 0) {
          timeData.hour = ["2", "3"];
        } else {
          timeData.hour = getTimeArr(hour);
        }
      }
    }
  },
  minute: (isUP, isGetTime) => {
    const hasEmpty = timeData.minute.includes("-");
    if (hasEmpty) {
      const minuteNow = new Date().getMinutes();
      timeData.minute = getTimeArr(minuteNow);
    } else {
      if (!isGetTime) {
        let minute = getTimeNumber(timeData.minute);
        isUP ? minute++ : minute--;
        if (minute === 60) {
          timeData.minute = ["0", "0"];
          //  getDefaultDate.hour()
        } else if (minute < 0) {
          timeData.minute = ["5", "9"];
        } else {
          timeData.minute = getTimeArr(minute);
        }
      }
    }
  },
  second: (isUP, isGetTime) => {
    const hasEmpty = timeData.second.includes("-");
    if (hasEmpty) {
      const secondNow = new Date().getSeconds();
      timeData.second = getTimeArr(secondNow);
    } else {
      if (!isGetTime) {
        let second = getTimeNumber(timeData.second);
        isUP ? second++ : second--;
        if (second === 60) {
          timeData.second = ["0", "0"];
          //   getDefaultDate.minute()
        } else if (second < 0) {
          timeData.second = ["5", "9"];
        } else {
          timeData.second = getTimeArr(second);
        }
      }
    }
  },
};
watch(
  [yearRef, mounthRef],
  ([nY, nM]) => {
    const isDayEmpty = timeData.day.every((item) => {
      return item === "-";
    });
    if (!isDayEmpty && getTimeNumber(nY) > 0 && getTimeNumber(nM) > 0) {
      const dateLong = new Date(
        getTimeNumber(nY),
        getTimeNumber(nM),
        0
      ).getDate();
      if (dateLong < getTimeNumber(timeData.day)) {
        const st = String(dateLong);
        timeData.day = [st[0], st[1]];
      }
    }
  },
  {
    deep: true,
  }
);
watch(type, (n) => {
  if (n === null) return window.removeEventListener("click", onClosePicker);
  let fnKey = ["year", "mounth", "day", "hour", "minute", "second"];
  const typeIndex = fnKey.indexOf(n);
  let currentFnKey = fnKey.slice(0, typeIndex + 1);
  currentFnKey.forEach((key) => {
    getDefaultDate[key](true, true);
  });
  cloneTimeData.value = JSON.parse(JSON.stringify(timeData));
  window.addEventListener("click", onClosePicker, true);
});
//2022-12-18 12:01:06
watch(
  modelData,
  (n) => {
    if (!n) {
      timeData = Object.assign(timeData, {
        year: ["-", "-", "-", "-"],
        mounth: ["-", "-"],
        day: ["-", "-"],
        hour: ["-", "-"],
        minute: ["-", "-"],
        second: ["-", "-"],
      });
      return;
    }
    const splitData = n.split(" ");
    const splitLength = splitData.length;
    let resultData = [];
    if (splitLength === 2) {
      resultData = resultData.concat(
        splitData[0].split("-"),
        splitData[1].split(":")
      );
      let obj = {
        year: getTimeArr(resultData[0], 4),
        mounth: getTimeArr(resultData[1]),
        hour: getTimeArr(resultData[3]),
        minute: getTimeArr(resultData[4]),
        second: resultData[5] ? getTimeArr(resultData[5]) : getTimeArr(0),
      };
      timeData = Object.assign(timeData, obj);
      nextTick(() => {
        timeData.day = getTimeArr(resultData[2]);
      });
    } else {
      resultData = resultData.concat(splitData[0].split("-"));
      let obj = {
        year: getTimeArr(resultData[0]),
        mounth: getTimeArr(resultData[1]),
      };
      timeData = Object.assign(timeData, obj);
      nextTick(() => {
        timeData.day = getTimeArr(resultData[2]);
      });
    }
  },
  {
    immediate: true,
  }
);
const onClosePicker = (isHandle) => {
  if (typeof isHandle !== "boolean" && timeBox.value.contains(isHandle.target))
    return;
  if (type.value !== null) {
    let fnKey = ["year", "mounth", "day", "hour", "minute", "second"];
    fnKey.forEach((key) => {
      getDefaultDate[key](true, true);
    });
    boxActive.value = false;
    if (getTimeNumber(timeData.year) <= 1000) {
      timeData.year = getTimeArr(1000, 4);
    }
    fnKey.forEach((key) => {
      if (key !== "year") {
        if (getTimeNumber(timeData[key]) > dateMap[key].value) {
          timeData[key] = getTimeArr(dateMap[key].value);
        } else if (
          Object.keys(dateMinMap).includes(key) &&
          getTimeNumber(timeData[key]) < dateMinMap[key].value
        ) {
          timeData[key] = getTimeArr(dateMinMap[key].value);
        }
      }
    });
  }
  setTimeout(() => {
    const resultData = getResultData(timeData);
    if (typeof isHandle === "boolean") {
      modelData.value = "";
      emits("change", "");
    }
    if (type.value !== null) {
      if (resultData !== modelData.value) {
        modelData.value = resultData;
        emits("change", resultData);
      }
    }
    type.value = null;
  });
};
onMounted(() => {
  type.value = null;
  window.addEventListener("keydown", onKeyDown);
});
onBeforeUnmount(() => {
  type.value = null;
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<style lang="scss" scoped>
.time-box-disabled {
  cursor: not-allowed;
  background: #e5e5e5;
  border-color: #e5e5e5;
}
.time-box {
  width: 100%;
  min-width: 200px;
  position: relative;
  border-radius: 8px;
  .time-close {
    display: none;
  }
  &:hover {
    .time-close {
      display: block;
    }
  }
  .time-picker.boxActive {
    border: 1px solid #5199a1;
  }

  .time-picker {
    border-radius: 8px;
    padding: 4px;
    overflow: hidden;
    width: 100%;
    border: 1px #e5e5e5 solid;
    height: 35px;
    line-height: 25px;
    box-sizing: border-box;
    display: flex;
    .time-icon {
      position: absolute;
      top: 7px;
      right: 2px;
      svg {
        width: 1em;
        height: 1em;
      }
    }
    > div {
      padding: 0px 2px;
    }

    .active {
      background: rgba(#5199a1, 1);
      color: #fff;
    }

    &-time {
      display: flex;
      > div {
        padding: 0 5px;
      }
    }
  }
}
</style>
