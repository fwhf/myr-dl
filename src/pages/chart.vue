<template>
    <div class="echarts-card box-shadow border-radius">
        <div class="name">折线图</div>
        <el-input v-model="textareaLine" :rows="5" type="textarea" placeholder="Please input json" />
        <div class="btn-group">
            <el-button type="primary" @click="initSettingLine()">生成配置</el-button>
            <el-button type="primary" @click="previewLine()">预览</el-button>
        </div>
        <div class="chart-content" v-show="textareaLine">
            <el-scrollbar>
                <div class="setting">
                    <div class="row background">
                        <div class="main">
                            <div class="label">背景:</div>
                            <el-color-picker v-model="lineSetting.backgroundColor" />
                        </div>
                    </div>
                    <div class="row title">
                        <div class="main">
                            <div class="label">title:</div>
                            <el-input v-model="lineSetting.title.text" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.title.show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">字体颜色</span>
                                    <el-color-picker v-model="lineSetting.title.textStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">字体大小</span>
                                    <el-input-number v-model="lineSetting.title.textStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation left-block">
                                    <span class="demonstration">距离左边(left/center/right/20/20%)</span>
                                    <el-input v-model="lineSetting.title.left" class="m-2" />
                                </div>
                                <div class="segmentation top-block">
                                    <span class="demonstration">距离上边(top/middle/bottom/20/20%)</span>
                                    <el-input v-model="lineSetting.title.top" class="m-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row legend">
                        <div class="main">
                            <div class="label">legend:</div>
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.legend.show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">字体颜色</span>
                                    <el-color-picker v-model="lineSetting.legend.textStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">字体大小</span>
                                    <el-input-number v-model="lineSetting.legend.textStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation left-block">
                                    <span class="demonstration">距离左边(left/center/right/20/20%)</span>
                                    <el-input v-model="lineSetting.legend.left" class="m-2" />
                                </div>
                                <div class="segmentation top-block">
                                    <span class="demonstration">距离上边(top/middle/bottom/20/20%)</span>
                                    <el-input v-model="lineSetting.legend.top" class="m-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row xAxis">
                        <div class="main">
                            <div class="label">X轴:</div>
                            <el-select v-model="lineSetting.xAxis.key" class="m-2">
                                <el-option v-for="item in lineSelect" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.xAxis.show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation position-block">
                                    <span class="demonstration">轴位置(top/bottom)</span>
                                    <el-input v-model="lineSetting.xAxis.position" class="m-2" />
                                </div>
                                <div class="segmentation name-block">
                                    <span class="demonstration">名称</span>
                                    <el-input v-model="lineSetting.xAxis.name" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation nameLocation-block">
                                    <span class="demonstration">名称位置(start/center/end)</span>
                                    <el-input v-model="lineSetting.xAxis.nameLocation" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">名称字体颜色</span>
                                    <el-color-picker v-model="lineSetting.xAxis.nameTextStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">名称字体大小</span>
                                    <el-input-number v-model="lineSetting.xAxis.nameTextStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.xAxis.axisLine.show" active-text="展示轴线"
                                    inactive-text="隐藏轴线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">轴线颜色</span>
                                    <el-color-picker v-model="lineSetting.xAxis.axisLine.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">轴线宽度</span>
                                    <el-input-number v-model="lineSetting.xAxis.axisLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.xAxis.axisTick.show" active-text="展示刻度"
                                    inactive-text="隐藏刻度" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度颜色</span>
                                    <el-color-picker v-model="lineSetting.xAxis.axisTick.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度宽度</span>
                                    <el-input-number v-model="lineSetting.xAxis.axisTick.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.xAxis.axisLabel.show"
                                    active-text="展示刻度标签" inactive-text="隐藏刻度标签" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度标签颜色</span>
                                    <el-color-picker v-model="lineSetting.xAxis.axisLabel.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度标签大小</span>
                                    <el-input-number v-model="lineSetting.xAxis.axisLabel.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.xAxis.splitLine.show"
                                    active-text="展示区域分割线" inactive-text="隐藏区域分割线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域分割线颜色</span>
                                    <el-color-picker v-model="lineSetting.xAxis.splitLine.lineStyle.color[0]" />
                                    <el-color-picker v-model="lineSetting.xAxis.splitLine.lineStyle.color[1]" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">区域分割线宽度</span>
                                    <el-input-number v-model="lineSetting.xAxis.splitLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row yAxis">
                        <div class="main">
                            <div class="label">Y轴1:</div>
                            <el-input v-model="lineSetting.yAxis[0].axisLabelUnit" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[0].show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation position-block">
                                    <span class="demonstration">轴位置(top/bottom)</span>
                                    <el-input v-model="lineSetting.yAxis[0].position" class="m-2" />
                                </div>
                                <div class="segmentation name-block">
                                    <span class="demonstration">名称</span>
                                    <el-input v-model="lineSetting.yAxis[0].name" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation nameLocation-block">
                                    <span class="demonstration">名称位置(start/center/end)</span>
                                    <el-input v-model="lineSetting.yAxis[0].nameLocation" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">名称字体颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[0].nameTextStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">名称字体大小</span>
                                    <el-input-number v-model="lineSetting.yAxis[0].nameTextStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[0].axisLine.show"
                                    active-text="展示轴线" inactive-text="隐藏轴线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">轴线颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[0].axisLine.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">轴线宽度</span>
                                    <el-input-number v-model="lineSetting.yAxis[0].axisLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[0].axisTick.show"
                                    active-text="展示刻度" inactive-text="隐藏刻度" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[0].axisTick.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度宽度</span>
                                    <el-input-number v-model="lineSetting.yAxis[0].axisTick.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[0].axisLabel.show"
                                    active-text="展示刻度标签" inactive-text="隐藏刻度标签" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度标签颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[0].axisLabel.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度标签大小</span>
                                    <el-input-number v-model="lineSetting.yAxis[0].axisLabel.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[0].splitLine.show"
                                    active-text="展示区域分割线" inactive-text="隐藏区域分割线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域分割线颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[0].splitLine.lineStyle.color[0]" />
                                    <el-color-picker v-model="lineSetting.yAxis[0].splitLine.lineStyle.color[1]" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">区域分割线宽度</span>
                                    <el-input-number v-model="lineSetting.yAxis[0].splitLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row yAxis">
                        <div class="main">
                            <div class="label">Y轴2:</div>
                            <el-input v-model="lineSetting.yAxis[1].axisLabelUnit" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[1].show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation position-block">
                                    <span class="demonstration">轴位置(top/bottom)</span>
                                    <el-input v-model="lineSetting.yAxis[1].position" class="m-2" />
                                </div>
                                <div class="segmentation name-block">
                                    <span class="demonstration">名称</span>
                                    <el-input v-model="lineSetting.yAxis[1].name" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation nameLocation-block">
                                    <span class="demonstration">名称位置(start/center/end)</span>
                                    <el-input v-model="lineSetting.yAxis[1].nameLocation" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">名称字体颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[1].nameTextStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">名称字体大小</span>
                                    <el-input-number v-model="lineSetting.yAxis[1].nameTextStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[1].axisLine.show"
                                    active-text="展示轴线" inactive-text="隐藏轴线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">轴线颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[1].axisLine.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">轴线宽度</span>
                                    <el-input-number v-model="lineSetting.yAxis[1].axisLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[1].axisTick.show"
                                    active-text="展示刻度" inactive-text="隐藏刻度" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[1].axisTick.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度宽度</span>
                                    <el-input-number v-model="lineSetting.yAxis[1].axisTick.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[1].axisLabel.show"
                                    active-text="展示刻度标签" inactive-text="隐藏刻度标签" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度标签颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[1].axisLabel.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度标签大小</span>
                                    <el-input-number v-model="lineSetting.yAxis[1].axisLabel.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineSetting.yAxis[1].splitLine.show"
                                    active-text="展示区域分割线" inactive-text="隐藏区域分割线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域分割线颜色</span>
                                    <el-color-picker v-model="lineSetting.yAxis[1].splitLine.lineStyle.color[0]" />
                                    <el-color-picker v-model="lineSetting.yAxis[1].splitLine.lineStyle.color[1]" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">区域分割线宽度</span>
                                    <el-input-number v-model="lineSetting.yAxis[1].splitLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lines" v-for="(line, index) in lineSetting.lines">
                        <div class="main">
                            <div class="label">线{{ index + 1 }}:</div>
                            <el-select v-model="line.key" class="m-2" placeholder="Select">
                                <el-option v-for="item in lineSelect" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-button type="danger" @click="delLine(index)">删除</el-button>
                                <div class="segmentation color-block">
                                    <span class="demonstration">使用第几个y轴(0,1)</span>
                                    <el-input-number v-model="line.yAxisIndex" :min="0" :max="1" />
                                </div>
                                <el-switch class="segmentation" v-model="line.smooth" active-text="曲线"
                                    inactive-text="折线" />
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="line.showSymbol" active-text="展示点标记"
                                    inactive-text="隐藏点标记" />
                                <div class="segmentation font-block">
                                    <span class="demonstration">点标记大小</span>
                                    <el-input-number v-model="line.symbolSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation top-block">
                                    <span
                                        class="demonstration">点标记样式(emptyCircle/circle/rect/roundRect/triangle/diamond/pin/arrow/none)</span>
                                    <el-input v-model="line.symbol" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation color-block">
                                    <span class="demonstration">线颜色</span>
                                    <el-color-picker v-model="line.colorBy" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">线宽度</span>
                                    <el-input-number v-model="line.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="line.areaStyle.show" active-text="展示区域填充"
                                    inactive-text="隐藏区域填充" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域填充颜色顶部</span>
                                    <el-color-picker v-model="line.areaStyle.color0" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域填充颜色底部</span>
                                    <el-color-picker v-model="line.areaStyle.color1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-btn">
                        <el-button type="primary" @click="addLine()">新增线</el-button>
                    </div>
                </div>
            </el-scrollbar>
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
const lineSelect = ref([])
const lineSetting = reactive({
    backgroundColor: '#fff',
    title: {
        show: true,
        text: '',
        textStyle: {
            color: '#333',
            fontSize: 18
        },
        left: 'center',
        top: '20'
    },
    legend: {
        show: true,
        textStyle: {
            color: '#333',
            fontSize: 14
        },
        left: 'right',
        top: '20'
    },
    xAxis: {
        key: '',
        type: 'category',
        show: true,
        data: [],
        position: 'left',
        name: '',
        nameLocation: 'end',
        nameTextStyle: {
            color: '#333',
            fontSize: 18
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#333',
                width: 1
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: '#333',
                width: 1
            }
        },
        axisLabel: {
            show: true,
            color: '#333',
            fontSize: 12
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#aaa', '#ddd'],
                type: [5, 10],
                width: 1
            }
        }
    },
    yAxis: [{
        key: '',
        type: 'value',
        axisLabelUnit: '',
        show: true,
        position: 'left',
        name: '',
        nameLocation: 'end',
        nameTextStyle: {
            color: '#333',
            fontSize: 18
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#333',
                width: 1
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: '#333',
                width: 1
            }
        },
        axisLabel: {
            show: true,
            color: '#333',
            fontSize: 12
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#aaa', '#ddd'],
                type: [5, 10],
                width: 1
            }
        }
    }, {
        key: '',
        type: 'value',
        axisLabelUnit: '',
        show: false,
        position: 'right',
        name: '',
        nameLocation: 'end',
        nameTextStyle: {
            color: '#333',
            fontSize: 18
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#333',
                width: 1
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: '#333',
                width: 1
            }
        },
        axisLabel: {
            show: true,
            color: '#333',
            fontSize: 12
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#aaa', '#ddd'],
                type: [5, 10],
                width: 1
            }
        }
    }],
    lines: []
})
let line = {
    key: '',
    name: '',
    type: 'line',
    smooth: true,
    yAxisIndex: 0,
    symbol: 'emptyCircle',
    symbolSize: 4,
    showSymbol: false,
    colorBy: '#66ff00',
    lineStyle: {
        width: 1
    },
    areaStyle: {
        show: false,
        color0: '#ff0000',
        color1: '#00ff00'
    },
    data: []
}
lineSetting.lines.push(JSON.parse(JSON.stringify(line)))
let lineChart = null
onMounted(() => {
    lineChart = echarts.init(lineDom.value);
    window.onresize = function() {
        lineChart.resize()
    }
})
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
    lineSetting.lines.push(JSON.parse(JSON.stringify(line)))
}
const delLine = (index) => {
    if (lineSetting.lines.length === 1) {
        ElMessage.error('最少保留一条线')
        return
    }
    lineSetting.lines.splice(index, 1)
}
const previewLine = () => {
    const lineOption = {
        grid: {
            containLabel: true,
            top: 60,
            left: 10,
            right: 10,
            bottom: 10
        },
        tooltip: {
            show: true
        },
        toolbox: {
            left: 10,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                magicType: {
                    type: ['line', 'bar', 'stack']
                },
                restore: {},
                saveAsImage: {},
                myFull: { // 全屏
                    show: true,
                    title: '全屏',
                    icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                    onclick: (e) => {
                        let domName = lineDom.value
                        // 全屏查看
                        if (domName.requestFullScreen) { // HTML W3C 提议
                            domName.requestFullScreen()
                        } else if (domName.msRequestFullscreen) { // IE11
                            domName.msRequestFullScreen()
                        } else if (domName.webkitRequestFullScreen) { // Webkit
                            domName.webkitRequestFullScreen()
                        } else if (domName.mozRequestFullScreen) { // Firefox
                            domName.mozRequestFullScreen()
                        }
                        // 退出全屏
                        if (domName.requestFullScreen) {
                            document.exitFullscreen()
                        } else if (domName.msRequestFullScreen) {
                            document.msExitFullscreen()
                        } else if (domName.webkitRequestFullScreen) {
                            document.webkitCancelFullScreen()
                        } else if (domName.mozRequestFullScreen) {
                            document.mozCancelFullScreen()
                        }
                    }
                }
            }
        },
    };

    let xAxisData = []
    let seriesData = []
    let legendData = []
    lineSetting.lines.forEach(item => {
        if (item.key) {
            let line = JSON.parse(JSON.stringify(item))
            if (line.areaStyle.show) {
                line.areaStyle = {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: line.areaStyle.color0
                        },
                        {
                            offset: 1,
                            color: line.areaStyle.color1
                        }
                    ])
                }
            } else {
                delete line.areaStyle
            }
            seriesData.push({
                ...line,
                name: line.key,
            })
            legendData.push(line.key)
        }
    })
    lineData.forEach(item => {
        xAxisData.push(item[lineSetting.xAxis.key])
        seriesData.forEach(seriesItem => {
            seriesItem.data.push(item[seriesItem.name])
        })
    })

    lineOption.backgroundColor = lineSetting.backgroundColor
    lineOption.title = JSON.parse(JSON.stringify(lineSetting.title))
    lineOption.legend = JSON.parse(JSON.stringify(lineSetting.legend))
    lineOption.legend.data = legendData
    lineOption.xAxis = JSON.parse(JSON.stringify(lineSetting.xAxis))
    lineOption.xAxis.data = xAxisData
    lineOption.yAxis = JSON.parse(JSON.stringify(lineSetting.yAxis))
    lineOption.yAxis.forEach(item => {
        if (item.axisLabelUnit) {
            item.axisLabel.formatter = '{value} ' + item.axisLabelUnit
        }
    })
    lineOption.series = seriesData

    lineChart.setOption(lineOption);
}
</script>

  
<style scoped lang="scss">
.echarts-card {
    margin-top: 20px;
    padding: 10px;
    background-color: $bg-color;

    &:first-child {
        margin-top: 0;
    }

    .name {
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

    .chart-content {
        margin-top: 10px;
        display: flex;
        height: 600px;

        .setting {
            flex: 1;
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid $border-color;

            .row {
                padding: 10px 0;
                border-bottom: 1px solid $border-color;

                &:first-child {
                    margin-top: 0;
                }

                .main {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .label {
                        width: 60px;
                        text-align: right;
                        padding-right: 10px;
                        font-size: 14px;
                        color: $color;
                    }
                }

                .detail {
                    padding-left: 100px;

                    .detail-row {
                        padding-top: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .segmentation {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            .demonstration {
                                font-size: 14px;
                                color: $color;
                                margin-right: 8px;
                            }

                            .el-input {
                                max-width: 100px;
                            }
                        }
                    }
                }
            }

            .bottom-btn {
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }

        .chart {
            flex: 1;
        }
    }
}</style>