<template>
    <el-calendar ref="calendar" v-model="value">
        <template #header="{ date }">
            <span>{{ date }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ tianqiValue }}</span>
            <el-button-group>
                <el-button size="small" @click="selectDate('prev-year')">
                    上年
                </el-button>
                <el-button size="small" @click="selectDate('prev-month')">
                    上月
                </el-button>
                <el-button size="small" @click="selectDate('today')">今日</el-button>
                <el-button size="small" @click="selectDate('next-month')">
                    下月
                </el-button>
                <el-button size="small" @click="selectDate('next-year')">
                    下年
                </el-button>
            </el-button-group>
        </template>
    </el-calendar>
</template>

<script setup>
import { ref } from 'vue'

const calendar = ref()
const selectDate = (val) => {
    if (!calendar.value) return
    calendar.value.selectDate(val)
}

const value = ref(new Date())

let xhr = null;
let tianqiValue = ref()
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    xhr = new ActiveXObject()
} else {
    xhr = null;
}
if (xhr) {
    xhr.open('GET', 'https://api.seniverse.com/v3/weather/now.json?key=Sr6cDEGhdgp628VN5&location=ip&language=zh-Hans&unit=c');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let res = JSON.parse(xhr.response)
            tianqiValue.value = res.results[0].location.name + ': ' + res.results[0].now.text
            xhr = null;
        }
    }
    xhr.send();
}
</script>
  
<style scoped lang="scss"></style>