<template>
    <div class="echarts-card box-shadow border-radius">
        <div class="title">折线图</div>
        <el-input v-model="textareaLine" :rows="5" type="textarea" placeholder="Please input json" />
        <div class="btn-group">
            <el-button type="primary" @click="initSettingLine()">生成配置</el-button>
            <el-button type="primary" @click="previewLine()">预览</el-button>
        </div>
        <div class="chart-content" v-show="textareaLine">
            <div class="setting">
                <div class="row xAxis">
                    <div class="row-l">
                        <div class="label">X轴:</div>
                        <el-select v-model="lineSetting.xAxis" class="m-2" placeholder="Select">
                            <el-option
                                v-for="item in lineSelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div class="btn"></div>
                </div>
                <div class="row lines" v-for="(line,index) in lineSetting.lines">
                    <div class="row-l">
                        <div class="label">线{{index + 1}}</div>
                        <el-select v-model="line.key" class="m-2" placeholder="Select">
                            <el-option
                                v-for="item in lineSelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div class="btn">
                        <el-button type="danger" @click="delLine(index)">删除</el-button>
                    </div>
                </div>
                <div class="bottom-btn">
                    <el-button type="primary" @click="addLine()">新增线</el-button>
                </div>
            </div>
            <div class="chart" ref="lineDom"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import * as echarts from 'echarts';

import test from '@/data/test'
let str = JSON.stringify(test)

// 折线图
const textareaLine = ref(str)
const lineDom = ref(null)
const lineOption = {
  xAxis: {
    type: 'category',
    data: []
  },
  legend: {
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
};
const lineSelect = ref([])
const lineSetting = reactive({
    xAxis: '',
    lines: [{
        key: ''
    }]
})
let lineChart = null
let lineData = []
const initSettingLine = () => {
    let vlaue = JSON.parse(textareaLine.value)
    let keys = Object.keys(vlaue)
    lineData = vlaue[keys[0]]

    let selectKeys = Object.keys(lineData[0])
    let selectValue = []
    selectKeys.forEach((item) => {
        selectValue.push({
            label: item,
            value: item
        })
    })
    lineSelect.value = selectValue
}
const addLine = () => {
    lineSetting.lines.push({
        key: ''
    })
}
const delLine = (index) => {
    if(lineSetting.lines.length === 1){
        ElMessage.error('最少保留一条线')
        return
    }
    lineSetting.lines.splice(index, 1)
}
const previewLine = () => {
    console.log(lineSetting)

    let xAxisData = []
    let seriesData = []
    let legendData = []
    lineSetting.lines.forEach(item => {
        seriesData.push({
            name: item.key,
            data: [],
            type: 'line'
        })
        legendData.push(item.key)
    })
    lineData.forEach(item => {
        xAxisData.push(item[lineSetting.xAxis])
        seriesData.forEach(seriesItem => {
            seriesItem.data.push(item[seriesItem.name])
        })
    })
    lineOption.xAxis.data = xAxisData
    lineOption.series = seriesData
    lineOption.legend.data = legendData

    lineChart = echarts.init(lineDom.value);
    lineChart.setOption(lineOption);
}
</script>

  
<style scoped lang="scss">

.echarts-card{
    margin-top: 20px;
    padding: 10px;
    background-color: $bg-color;
    &:first-child{
        margin-top: 0;
    }
    .title{
        font-size: 14px;
        color: $color;
        line-height: 14px;
        margin-bottom: 10px;
    }
    .btn-group {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }
    .chart-content{
        margin-top: 10px;
        display: flex;
        min-height: 400px;
        .setting{
            flex:1;
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid $border-color;
            .row{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &:first-child{
                    margin-top: 0;
                }
                .row-l{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .label{
                        width: 60px;
                        text-align: right;
                        padding-right: 10px;
                        font-size: 14px;
                        color: $color;
                    }
                }
                .btn{
                    display: flex;
                    justify-content: flex-end;
                }
            }
            .bottom-btn{
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }
        .chart{
            flex:1;
        }
    }
}
</style>