<template>
    <div class="echarts-card box-shadow border-radius">
        <div class="name">柱状图</div>
        <el-input v-model="textareaPie" :rows="5" type="textarea" placeholder="Please input json" />
        <div class="btn-group">
            <el-button type="primary" @click="initSettingBar()">生成配置</el-button>
            <el-button type="primary" @click="previewBar()">预览</el-button>
        </div>
        <div class="chart-content" v-show="textareaPie">
            <el-scrollbar>
                <div class="setting">
                    <div class="row background">
                        <div class="main">
                            <div class="label">背景:</div>
                            <el-color-picker show-alpha v-model="pieSetting.backgroundColor" />
                        </div>
                    </div>
                    <div class="row title">
                        <div class="main">
                            <div class="label">title:</div>
                            <el-input v-model="pieSetting.title.text" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="pieSetting.title.show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">字体颜色</span>
                                    <el-color-picker show-alpha v-model="pieSetting.title.textStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">字体大小</span>
                                    <el-input-number v-model="pieSetting.title.textStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation left-block">
                                    <span class="demonstration">距离左边(left/center/right/20/20%)</span>
                                    <el-input v-model="pieSetting.title.left" class="m-2" />
                                </div>
                                <div class="segmentation top-block">
                                    <span class="demonstration">距离上边(top/middle/bottom/20/20%)</span>
                                    <el-input v-model="pieSetting.title.top" class="m-2" />
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
                                <el-switch class="segmentation" v-model="pieSetting.legend.show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">字体颜色</span>
                                    <el-color-picker show-alpha v-model="pieSetting.legend.textStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">字体大小</span>
                                    <el-input-number v-model="pieSetting.legend.textStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation left-block">
                                    <span class="demonstration">距离左边(left/center/right/20/20%)</span>
                                    <el-input v-model="pieSetting.legend.left" class="m-2" />
                                </div>
                                <div class="segmentation top-block">
                                    <span class="demonstration">距离上边(top/middle/bottom/20/20%)</span>
                                    <el-input v-model="pieSetting.legend.top" class="m-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row pies" v-for="(pie, index) in pieSetting.pies">
                        <div class="main">
                            <div class="label">饼{{ index + 1 }}:</div>
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-button type="danger" @click="delPie(index)">删除饼</el-button>
                                <div class="segmentation color-block">
                                    <span class="demonstration">起始角度</span>
                                    <el-input-number v-model="pie.startAngle" :min="0" :max="360" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">扇形类型(radius/area)</span>
                                    <el-input v-model="pie.roseType" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation color-block">
                                    <span class="demonstration">饼图中心(20/20%)</span>
                                    <el-input v-model="pie.center[0]" class="m-2" />
                                    <el-input v-model="pie.center[1]" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">饼图半径(20/20%)</span>
                                    <el-input v-model="pie.radius[0]" class="m-2" />
                                    <el-input v-model="pie.radius[1]" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row pies-data" v-for="(pieData, pieDataIndex) in pie.data">
                                <div class="main">
                                    <div class="label">扇{{ (index + 1) + '-' + (pieDataIndex + 1) }}:</div>
                                    <el-select v-model="pieData.key" class="m-2" placeholder="Select">
                                        <el-option v-for="item in pieSelect" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </div>
                                <div class="detail-row">
                                    <el-button type="danger" @click="delPieData(index, pieDataIndex)">删除扇</el-button>
                                    <el-switch class="segmentation" v-model="pieData.label.show" active-text="展示扇label"
                                        inactive-text="关闭扇label" />
                                    <div class="segmentation font-block">
                                        <span class="demonstration">扇label颜色</span>
                                        <el-color-picker show-alpha v-model="pieData.label.color" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation color-block">
                                        <span class="demonstration">扇label大小</span>
                                        <el-input-number v-model="pieData.label.fontSize" :min="1" />
                                    </div>
                                    <div class="segmentation position-block">
                                        <span class="demonstration">扇label位置(outside/inside/center)</span>
                                        <el-input v-model="pieData.label.position" class="m-2" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation font-block">
                                        <span class="demonstration">扇颜色</span>
                                        <el-color-picker show-alpha v-model="pieData.itemStyle.color" />
                                    </div>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">扇border颜色</span>
                                        <el-color-picker show-alpha v-model="pieData.itemStyle.borderColor" />
                                    </div>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">扇border宽度</span>
                                        <el-input-number v-model="pieData.itemStyle.borderWidth" :min="1" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation font-block">
                                        <span class="demonstration">扇圆角</span>
                                        <el-input-number v-model="pieData.itemStyle.borderRadius[0]" :min="0" />
                                        <el-input-number v-model="pieData.itemStyle.borderRadius[1]" :min="0" />
                                        <el-input-number v-model="pieData.itemStyle.borderRadius[2]" :min="0" />
                                        <el-input-number v-model="pieData.itemStyle.borderRadius[3]" :min="0" />
                                    </div>
                                </div>
                            </div>
                            <div class="bottom-btn">
                                <el-button type="primary" @click="addPieData(index)">新增扇</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-btn">
                        <el-button type="primary" @click="addPie()">新增饼</el-button>
                    </div>
                </div>
            </el-scrollbar>
            <div class="chart" ref="pieDom"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import * as echarts from 'echarts';

import test from '@/data/test'
let str = JSON.stringify(test)

// 饼图
const textareaPie = ref(str)
const pieDom = ref(null)
const pieSelect = ref([])
const pieSetting = reactive({
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
    pies: []
})
let pie = {
    type: 'pie',
    startAngle: 90,
    roseType: 'radius',
    center: ['50%', '50%'],
    radius: [0, '75%'],
    data: [{
        key: '',
        label: {
            show: false,
            color: '#333',
            fontSize: 12,
            position: 'outside'
        },
        itemStyle: {
            color: '#ffff00',
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: [0, 0, 0, 0]
        }
    }]
}
pieSetting.pies.push(JSON.parse(JSON.stringify(pie)))
let pieChart = null
onMounted(() => {
    pieChart = echarts.init(pieDom.value);
    window.onresize = function() {
        pieChart.resize()
    }
})
let pieData = []
const initSettingBar = () => {
    let vlaue = JSON.parse(textareaPie.value)
    let keys = Object.keys(vlaue)
    pieData = vlaue[keys[0]]

    let selectKeys = Object.keys(pieData[0])
    let selectValue = []
    selectKeys.forEach((item) => {
        selectValue.push({
            label: item,
            value: item
        })
    })
    pieSelect.value = selectValue
}
const addPie = () => {
    pieSetting.pies.push(JSON.parse(JSON.stringify(pie)))
}
const addPieData = (index) => {
    pieSetting.pies[index].data.push(JSON.parse(JSON.stringify(pie.data[0])))
}
const delPie = (index) => {
    if (pieSetting.pies.length === 1) {
        ElMessage.error('最少保留一个饼图')
        return
    }
    pieSetting.pies.splice(index, 1)
}
const delPieData = (index, pieDataIndex) => {
    if (pieSetting.pies[index].data.length === 1) {
        ElMessage.error('最少保留一个扇形')
        return
    }
    pieSetting.pies[index].data.splice(pieDataIndex, 1)
}
const previewBar = () => {
    const pieOption = {
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
                restore: {},
                saveAsImage: {},
                myFull: { // 全屏
                    show: true,
                    title: '全屏',
                    icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                    onclick: (e) => {
                        let domName = pieDom.value
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

    let seriesData = []
    let legendData = []

    if(pieSetting.pies.length > 1){
        pieSetting.legend.show = false
    }
    pieSetting.pies.forEach(pie => {
        let newPie = JSON.parse(JSON.stringify(pie))
        newPie.data.forEach(item => {
            item.name = item.key
            legendData.push(item.key)

            let value = 0
            pieData.forEach(pieDataItem => {
                value += pieDataItem[item.key]
            })
            item.value = value
        })
        seriesData.push({
            ...newPie,
        })
    })

    console.log(seriesData)
    

    pieOption.backgroundColor = pieSetting.backgroundColor
    pieOption.title = JSON.parse(JSON.stringify(pieSetting.title))
    pieOption.legend = JSON.parse(JSON.stringify(pieSetting.legend))
    pieOption.legend.data = legendData

    pieOption.series = seriesData

    pieChart.setOption(pieOption);
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
                    .el-select{
                        width: 200px;
                        margin-right: 10px;
                    }
                    .el-input{
                        width: 200px;
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
                                display: block;
                                max-width: 590px;
                                word-break: break-all;
                            }

                            .el-input {
                                max-width: 100px;
                            }
                        }

                        &.pies-data{
                            display: block;
                            padding-top: 10px;
                            margin-top: 10px;
                            border-top: 1px solid $border-color;
                            .detail-row {
                                padding-left: 100px;
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