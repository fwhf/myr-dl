<template>
    <div class="echarts-card box-shadow border-radius">
        <div class="name">柱状图</div>
        <el-input v-model="textareaBar" :rows="5" type="textarea" placeholder="Please input json" />
        <div class="btn-group">
            <el-button type="primary" @click="initSettingLineBar()">生成配置</el-button>
            <el-button type="primary" @click="previewLineBar()">预览</el-button>
        </div>
        <div class="chart-content" v-show="textareaBar">
            <el-scrollbar>
                <div class="setting">
                    <div class="row background">
                        <div class="main">
                            <div class="label">背景:</div>
                            <el-color-picker show-alpha v-model="lineBarSetting.backgroundColor" />
                        </div>
                    </div>
                    <div class="row title">
                        <div class="main">
                            <div class="label">title:</div>
                            <el-input v-model="lineBarSetting.title.text" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.title.show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">字体颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.title.textStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">字体大小</span>
                                    <el-input-number v-model="lineBarSetting.title.textStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation left-block">
                                    <span class="demonstration">距离左边(left/center/right/20/20%)</span>
                                    <el-input v-model="lineBarSetting.title.left" class="m-2" />
                                </div>
                                <div class="segmentation top-block">
                                    <span class="demonstration">距离上边(top/middle/bottom/20/20%)</span>
                                    <el-input v-model="lineBarSetting.title.top" class="m-2" />
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
                                <el-switch class="segmentation" v-model="lineBarSetting.legend.show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">字体颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.legend.textStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">字体大小</span>
                                    <el-input-number v-model="lineBarSetting.legend.textStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation left-block">
                                    <span class="demonstration">距离左边(left/center/right/20/20%)</span>
                                    <el-input v-model="lineBarSetting.legend.left" class="m-2" />
                                </div>
                                <div class="segmentation top-block">
                                    <span class="demonstration">距离上边(top/middle/bottom/20/20%)</span>
                                    <el-input v-model="lineBarSetting.legend.top" class="m-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row xAxis">
                        <div class="main">
                            <div class="label">X轴1:</div>
                            <el-select v-model="lineBarSetting.xAxis[0].key" clearable class="m-2">
                                <el-option v-for="item in lineBarSelect" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input v-model="lineBarSetting.xAxis[0].axisLabelUnit"
                                :disabled="Boolean(lineBarSetting.xAxis[0].key)" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[0].show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation position-block">
                                    <span class="demonstration">轴位置(top/bottom)</span>
                                    <el-input v-model="lineBarSetting.xAxis[0].position" class="m-2" />
                                </div>
                                <div class="segmentation name-block">
                                    <span class="demonstration">名称</span>
                                    <el-input v-model="lineBarSetting.xAxis[0].name" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation nameLocation-block">
                                    <span class="demonstration">名称位置(start/center/end)</span>
                                    <el-input v-model="lineBarSetting.xAxis[0].nameLocation" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">名称字体颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.xAxis[0].nameTextStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">名称字体大小</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[0].nameTextStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[0].axisLine.show"
                                    active-text="展示轴线" inactive-text="隐藏轴线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">轴线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[0].axisLine.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">轴线宽度</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[0].axisLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[0].axisTick.show"
                                    active-text="展示刻度" inactive-text="隐藏刻度" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[0].axisTick.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度宽度</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[0].axisTick.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[0].axisLabel.show"
                                    active-text="展示刻度标签" inactive-text="隐藏刻度标签" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度标签颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.xAxis[0].axisLabel.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度标签大小</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[0].axisLabel.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[0].splitLine.show"
                                    active-text="展示区域分割线" inactive-text="隐藏区域分割线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域分割线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[0].splitLine.lineStyle.color[0]" />
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[0].splitLine.lineStyle.color[1]" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">区域分割线宽度</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[0].splitLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row xAxis">
                        <div class="main">
                            <div class="label">X轴2:</div>
                            <el-select v-model="lineBarSetting.xAxis[1].key" clearable class="m-2">
                                <el-option v-for="item in lineBarSelect" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input v-model="lineBarSetting.xAxis[1].axisLabelUnit"
                                :disabled="Boolean(lineBarSetting.xAxis[1].key)" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[1].show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation position-block">
                                    <span class="demonstration">轴位置(top/bottom)</span>
                                    <el-input v-model="lineBarSetting.xAxis[1].position" class="m-2" />
                                </div>
                                <div class="segmentation name-block">
                                    <span class="demonstration">名称</span>
                                    <el-input v-model="lineBarSetting.xAxis[1].name" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation nameLocation-block">
                                    <span class="demonstration">名称位置(start/center/end)</span>
                                    <el-input v-model="lineBarSetting.xAxis[1].nameLocation" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">名称字体颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.xAxis[1].nameTextStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">名称字体大小</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[1].nameTextStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[1].axisLine.show"
                                    active-text="展示轴线" inactive-text="隐藏轴线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">轴线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[1].axisLine.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">轴线宽度</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[1].axisLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[1].axisTick.show"
                                    active-text="展示刻度" inactive-text="隐藏刻度" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[1].axisTick.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度宽度</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[1].axisTick.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[1].axisLabel.show"
                                    active-text="展示刻度标签" inactive-text="隐藏刻度标签" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度标签颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.xAxis[1].axisLabel.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度标签大小</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[1].axisLabel.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.xAxis[1].splitLine.show"
                                    active-text="展示区域分割线" inactive-text="隐藏区域分割线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域分割线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[1].splitLine.lineStyle.color[0]" />
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.xAxis[1].splitLine.lineStyle.color[1]" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">区域分割线宽度</span>
                                    <el-input-number v-model="lineBarSetting.xAxis[1].splitLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row yAxis">
                        <div class="main">
                            <div class="label">Y轴1:</div>
                            <el-select v-model="lineBarSetting.yAxis[0].key" clearable class="m-2">
                                <el-option v-for="item in lineBarSelect" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input v-model="lineBarSetting.yAxis[0].axisLabelUnit"
                                :disabled="Boolean(lineBarSetting.yAxis[0].key)" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[0].show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation position-block">
                                    <span class="demonstration">轴位置(left/right)</span>
                                    <el-input v-model="lineBarSetting.yAxis[0].position" class="m-2" />
                                </div>
                                <div class="segmentation name-block">
                                    <span class="demonstration">名称</span>
                                    <el-input v-model="lineBarSetting.yAxis[0].name" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation nameLocation-block">
                                    <span class="demonstration">名称位置(start/center/end)</span>
                                    <el-input v-model="lineBarSetting.yAxis[0].nameLocation" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">名称字体颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.yAxis[0].nameTextStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">名称字体大小</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[0].nameTextStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[0].axisLine.show"
                                    active-text="展示轴线" inactive-text="隐藏轴线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">轴线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[0].axisLine.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">轴线宽度</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[0].axisLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[0].axisTick.show"
                                    active-text="展示刻度" inactive-text="隐藏刻度" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[0].axisTick.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度宽度</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[0].axisTick.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[0].axisLabel.show"
                                    active-text="展示刻度标签" inactive-text="隐藏刻度标签" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度标签颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.yAxis[0].axisLabel.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度标签大小</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[0].axisLabel.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[0].splitLine.show"
                                    active-text="展示区域分割线" inactive-text="隐藏区域分割线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域分割线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[0].splitLine.lineStyle.color[0]" />
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[0].splitLine.lineStyle.color[1]" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">区域分割线宽度</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[0].splitLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row yAxis">
                        <div class="main">
                            <div class="label">Y轴2:</div>
                            <el-select v-model="lineBarSetting.yAxis[1].key" clearable class="m-2">
                                <el-option v-for="item in lineBarSelect" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input v-model="lineBarSetting.yAxis[1].axisLabelUnit"
                                :disabled="Boolean(lineBarSetting.yAxis[1].key)" class="m-2" />
                        </div>
                        <div class="detail">
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[1].show" active-text="展示"
                                    inactive-text="隐藏" />
                                <div class="segmentation position-block">
                                    <span class="demonstration">轴位置(left/right)</span>
                                    <el-input v-model="lineBarSetting.yAxis[1].position" class="m-2" />
                                </div>
                                <div class="segmentation name-block">
                                    <span class="demonstration">名称</span>
                                    <el-input v-model="lineBarSetting.yAxis[1].name" class="m-2" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <div class="segmentation nameLocation-block">
                                    <span class="demonstration">名称位置(start/center/end)</span>
                                    <el-input v-model="lineBarSetting.yAxis[1].nameLocation" class="m-2" />
                                </div>
                                <div class="segmentation color-block">
                                    <span class="demonstration">名称字体颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.yAxis[1].nameTextStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">名称字体大小</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[1].nameTextStyle.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[1].axisLine.show"
                                    active-text="展示轴线" inactive-text="隐藏轴线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">轴线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[1].axisLine.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">轴线宽度</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[1].axisLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[1].axisTick.show"
                                    active-text="展示刻度" inactive-text="隐藏刻度" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[1].axisTick.lineStyle.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度宽度</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[1].axisTick.lineStyle.width" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[1].axisLabel.show"
                                    active-text="展示刻度标签" inactive-text="隐藏刻度标签" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">刻度标签颜色</span>
                                    <el-color-picker show-alpha v-model="lineBarSetting.yAxis[1].axisLabel.color" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">刻度标签大小</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[1].axisLabel.fontSize" :min="1" />
                                </div>
                            </div>
                            <div class="detail-row">
                                <el-switch class="segmentation" v-model="lineBarSetting.yAxis[1].splitLine.show"
                                    active-text="展示区域分割线" inactive-text="隐藏区域分割线" />
                                <div class="segmentation color-block">
                                    <span class="demonstration">区域分割线颜色</span>
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[1].splitLine.lineStyle.color[0]" />
                                    <el-color-picker show-alpha
                                        v-model="lineBarSetting.yAxis[1].splitLine.lineStyle.color[1]" />
                                </div>
                                <div class="segmentation font-block">
                                    <span class="demonstration">区域分割线宽度</span>
                                    <el-input-number v-model="lineBarSetting.yAxis[1].splitLine.lineStyle.width" :min="1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lineBars" v-for="(lineBar, index) in lineBarSetting.lineBars">
                        <template v-if="lineBar.type === 'line'">
                            <div class="main">
                                <div class="label">线{{ index + 1 }}:</div>
                                <el-select v-model="lineBar.key" class="m-2" placeholder="Select">
                                    <el-option v-for="item in lineBarSelect" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                            <div class="detail">
                                <div class="detail-row">
                                    <el-button type="danger" @click="delLine(index)">删除</el-button>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">使用第几个y轴(0,1)</span>
                                        <el-input-number v-model="lineBar.yAxisIndex" :min="0" :max="1" />
                                    </div>
                                    <el-switch class="segmentation" v-model="lineBar.smooth" active-text="曲线"
                                        inactive-text="折线" />
                                </div>
                                <div class="detail-row">
                                    <el-switch class="segmentation" v-model="lineBar.showSymbol" active-text="展示点标记"
                                        inactive-text="隐藏点标记" />
                                    <div class="segmentation font-block">
                                        <span class="demonstration">点标记大小</span>
                                        <el-input-number v-model="lineBar.symbolSize" :min="1" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <el-switch class="segmentation" v-model="lineBar.itemStyle.show" active-text="标记点使用固定色"
                                        inactive-text="标记点使用随机色" />
                                    <div class="segmentation font-block">
                                        <span class="demonstration">标记点颜色</span>
                                        <el-color-picker show-alpha v-model="lineBar.itemStyle.color" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation top-block">
                                        <span
                                            class="demonstration">点标记样式(emptyCircle/circle/rect/roundRect/triangle/diamond/pin/arrow/none)</span>
                                        <el-input v-model="lineBar.symbol" class="m-2" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation color-block">
                                        <span class="demonstration">线颜色</span>
                                        <el-color-picker show-alpha v-model="lineBar.colorBy" />
                                    </div>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">线宽度</span>
                                        <el-input-number v-model="lineBar.lineStyle.width" :min="1" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <el-switch class="segmentation" v-model="lineBar.areaStyle.show" active-text="展示区域填充"
                                        inactive-text="隐藏区域填充" />
                                    <div class="segmentation color-block">
                                        <span class="demonstration">区域填充颜色顶部</span>
                                        <el-color-picker show-alpha v-model="lineBar.areaStyle.color0" />
                                    </div>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">区域填充颜色底部</span>
                                        <el-color-picker show-alpha v-model="lineBar.areaStyle.color1" />
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-if="lineBar.type === 'bar'">
                            <div class="main">
                                <div class="label">柱{{ index + 1 }}:</div>
                                <el-select v-model="lineBar.key" class="m-2" placeholder="Select">
                                    <el-option v-for="item in lineBarSelect" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                            <div class="detail">
                                <div class="detail-row">
                                    <el-button type="danger" @click="delLineBar(index)">删除</el-button>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">使用第几个x轴(0,1)</span>
                                        <el-input-number v-model="lineBar.xAxisIndex" :min="0" :max="1" />
                                    </div>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">使用第几个y轴(0,1)</span>
                                        <el-input-number v-model="lineBar.yAxisIndex" :min="0" :max="1" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <el-switch class="segmentation" v-model="lineBar.showBackground" active-text="展示背景色"
                                        inactive-text="关闭背景色" />
                                    <div class="segmentation font-block">
                                        <span class="demonstration">背景色颜色</span>
                                        <el-color-picker show-alpha v-model="lineBar.backgroundStyle.color" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation color-block">
                                        <span class="demonstration">背景圆角</span>
                                        <el-input-number v-model="lineBar.backgroundStyle.borderRadius[0]" :min="0" />
                                        <el-input-number v-model="lineBar.backgroundStyle.borderRadius[1]" :min="0" />
                                        <el-input-number v-model="lineBar.backgroundStyle.borderRadius[2]" :min="0" />
                                        <el-input-number v-model="lineBar.backgroundStyle.borderRadius[3]" :min="0" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <el-switch class="segmentation" v-model="lineBar.label.show" active-text="展示柱label"
                                        inactive-text="关闭柱label" />
                                    <div class="segmentation font-block">
                                        <span class="demonstration">柱label颜色</span>
                                        <el-color-picker show-alpha v-model="lineBar.label.color" />
                                    </div>
                                    <div class="segmentation color-block">
                                        <span class="demonstration">柱label大小</span>
                                        <el-input-number v-model="lineBar.label.fontSize" :min="0" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation position-block">
                                        <span
                                            class="demonstration">柱label位置(top/left/right/bottom/inside/insideLeft/insideRight/insideTop/insideBottom/insideTopLeft/insideBottomLeft/insideTopRight/insideBottomRight)</span>
                                        <el-input v-model="lineBar.label.position" class="m-2" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <el-switch class="segmentation" v-model="lineBar.itemStyle.colorsType"
                                        active-text="使用渐变色" inactive-text="使用单色" />
                                    <div class="segmentation font-block">
                                        <span class="demonstration">柱条颜色</span>
                                        <el-color-picker show-alpha v-model="lineBar.itemStyle.color" />
                                    </div>
                                    <div class="segmentation font-block">
                                        <span class="demonstration">柱条渐变颜色</span>
                                        <el-color-picker show-alpha v-model="lineBar.itemStyle.colors[0]" />
                                        <el-color-picker show-alpha v-model="lineBar.itemStyle.colors[1]" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation font-block">
                                        <span class="demonstration">柱条圆角</span>
                                        <el-input-number v-model="lineBar.itemStyle.borderRadius[0]" :min="0" />
                                        <el-input-number v-model="lineBar.itemStyle.borderRadius[1]" :min="0" />
                                        <el-input-number v-model="lineBar.itemStyle.borderRadius[2]" :min="0" />
                                        <el-input-number v-model="lineBar.itemStyle.borderRadius[3]" :min="0" />
                                    </div>
                                </div>
                                <div class="detail-row">
                                    <div class="segmentation font-block">
                                        <span class="demonstration">数据堆叠</span>
                                        <el-input v-model="lineBar.stack" class="m-2" />
                                    </div>
                                    <div class="segmentation font-block">
                                        <span class="demonstration">最大柱条宽(20/20%)</span>
                                        <el-input v-model="lineBar.barMaxWidth" class="m-2" />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="bottom-btn">
                        <el-button type="primary" @click="addLine()">新增线</el-button>
                        <el-button type="primary" @click="addBar()">新增线</el-button>
                    </div>
                </div>
            </el-scrollbar>
            <div class="chart" ref="barDom"></div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import * as echarts from 'echarts';

import test from '@/data/test'
let str = JSON.stringify(test)

// 折线-柱状图
const textareaBar = ref(str)
const barDom = ref(null)
const lineBarSelect = ref([])
const lineBarSetting = reactive({
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
    xAxis: [{
        key: '',
        type: 'category',
        axisLabelUnit: '',
        show: true,
        data: [],
        position: 'bottom',
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
        type: 'category',
        axisLabelUnit: '',
        show: false,
        data: [],
        position: 'top',
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
    lineBars: []
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
    itemStyle: {
        show: false,
        color: '#66ff00'
    },
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
let bar = {
    key: '',
    name: '',
    type: 'bar',
    xAxisIndex: 0,
    yAxisIndex: 0,
    showBackground: false,
    backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
        borderRadius: [0, 0, 0, 0]
    },
    label: {
        show: false,
        color: '#333',
        fontSize: 12,
        position: 'insideTop'
    },
    itemStyle: {
        colorsType: false,
        color: '#ffff00',
        colors: ['#ffff00', '#66ff00'],
        borderRadius: [0, 0, 0, 0]
    },
    stack: '',
    barMaxWidth: '30',
    data: []
}
lineBarSetting.lineBars.push(JSON.parse(JSON.stringify(line)))
lineBarSetting.lineBars.push(JSON.parse(JSON.stringify(bar)))
let barChart = null
onMounted(() => {
    barChart = echarts.init(barDom.value);
    window.onresize = function () {
        barChart.resize()
    }
})
let barData = []
const initSettingLineBar = () => {
    let vlaue = JSON.parse(textareaBar.value)
    let keys = Object.keys(vlaue)
    barData = vlaue[keys[0]]

    let selectKeys = Object.keys(barData[0])
    let selectValue = []
    selectKeys.forEach((item) => {
        selectValue.push({
            label: item,
            value: item
        })
    })
    lineBarSelect.value = selectValue
}
const addLine = () => {
    lineBarSetting.lineBars.push(JSON.parse(JSON.stringify(line)))
}
const addBar = () => {
    lineBarSetting.lineBars.push(JSON.parse(JSON.stringify(bar)))
}
const delLineBar = (index) => {
    if (lineBarSetting.lineBars.length === 1) {
        ElMessage.error('最少保留一组数据')
        return
    }
    lineBarSetting.lineBars.splice(index, 1)
}
const previewLineBar = () => {
    const barOption = {
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
                    type: ['line', 'bar']
                },
                restore: {},
                saveAsImage: {},
                myFull: { // 全屏
                    show: true,
                    title: '全屏',
                    icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                    onclick: (e) => {
                        let domName = barDom.value
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

    let axisData = []
    let seriesData = []
    let legendData = []
    let axisKey = ''
    let linearGradient = [0, 0, 0, 1]
    for (let i = 0; i < lineBarSetting.xAxis.length; i++) {
        if (lineBarSetting.xAxis[i].key && lineBarSetting.xAxis[i].show) {
            axisKey = lineBarSetting.xAxis[i].key
            break
        }
    }
    if (axisKey) {
        lineBarSetting.xAxis.forEach(item => {
            item.type = 'category'
            delete item.axisLabel.formatter
        })

        lineBarSetting.yAxis.forEach(item => {
            item.type = 'value'
            if (item.axisLabelUnit) {
                item.axisLabel.formatter = '{value} ' + item.axisLabelUnit
            } else {
                delete item.axisLabel.formatter
            }
        })
    } else {
        linearGradient = [0, 0, 1, 0]
        for (let i = 0; i < lineBarSetting.yAxis.length; i++) {
            if (lineBarSetting.yAxis[i].key && lineBarSetting.yAxis[i].show) {
                axisKey = lineBarSetting.yAxis[i].key
                break
            }
        }
        lineBarSetting.yAxis.forEach(item => {
            item.type = 'category'
            delete item.axisLabel.formatter
        })

        lineBarSetting.xAxis.forEach(item => {
            item.type = 'value'
            if (item.axisLabelUnit) {
                item.axisLabel.formatter = '{value} ' + item.axisLabelUnit
            } else {
                delete item.axisLabel.formatter
            }
        })
    }
    if (!axisKey) {
        ElMessage.error('必选选择一个轴label')
        return
    }
    lineBarSetting.lineBars.forEach(item => {
        if (item.key) {
            if (item.type === 'line') {
                let line = JSON.parse(JSON.stringify(item))
                if (line.areaStyle.show) {
                    line.areaStyle.color = new echarts.graphic.LinearGradient(linearGradient[0], linearGradient[1], linearGradient[2], linearGradient[3], [
                        {
                            offset: 0,
                            color: line.areaStyle.color0
                        },
                        {
                            offset: 1,
                            color: line.areaStyle.color1
                        }
                    ])
                } else {
                    delete line.areaStyle
                }
                if (!line.itemStyle.show) {
                    delete line.itemStyle
                }
                line.lineStyle.color = line.colorBy
                seriesData.push({
                    ...line,
                    name: line.key,
                })
                legendData.push({
                    name: line.key,
                    itemStyle: {
                        color: line.colorBy
                    }
                })
            } else if (item.type === 'bar') {
                let bar = JSON.parse(JSON.stringify(item))
                if (bar.itemStyle.colorsType) {
                    bar.itemStyle.color = new echarts.graphic.LinearGradient(linearGradient[0], linearGradient[1], linearGradient[2], linearGradient[3], [
                        {
                            offset: 0,
                            color: bar.itemStyle.colors[0]
                        },
                        {
                            offset: 1,
                            color: bar.itemStyle.colors[1]
                        }
                    ])
                }
                delete bar.itemStyle.colors
                delete bar.itemStyle.colorsType
                seriesData.push({
                    ...bar,
                    name: bar.key,
                })
                legendData.push({
                    name: bar.key
                })
            }
        }
    })
    barData.forEach(item => {
        axisData.push(item[axisKey])
        seriesData.forEach(seriesItem => {
            seriesItem.data.push(item[seriesItem.name])
        })
    })

    barOption.backgroundColor = lineBarSetting.backgroundColor
    barOption.title = JSON.parse(JSON.stringify(lineBarSetting.title))
    barOption.legend = JSON.parse(JSON.stringify(lineBarSetting.legend))
    barOption.legend.data = legendData
    barOption.xAxis = JSON.parse(JSON.stringify(lineBarSetting.xAxis))
    barOption.xAxis.forEach(item => {
        if (item.key === axisKey) {
            item.data = axisData
        }
    })
    barOption.yAxis = JSON.parse(JSON.stringify(lineBarSetting.yAxis))
    barOption.yAxis.forEach(item => {
        if (item.key === axisKey) {
            item.data = axisData
        }
    })
    barOption.series = seriesData

    barChart.setOption(barOption);
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

                    .el-select {
                        width: 200px;
                        margin-right: 10px;
                    }

                    .el-input {
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
}
</style>