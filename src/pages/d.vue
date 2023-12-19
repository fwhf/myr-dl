<template>
    <div class="input-card box-shadow border-radius">
        <el-input v-model="textarea" :rows="5" type="textarea" placeholder="Please input json" />
        <div class="btn-group">
            <el-button type="primary" @click="preview">预览</el-button>
            <el-button type="primary" class="dowload" @click="dowload">下载</el-button>
            <el-button type="primary" class="formula" @click="changeFormulaShow">{{formulaShow ? '隐藏' : '显示'}}公式列</el-button>
        </div>
    </div>
    <div class="table-card box-shadow border-radius">
        <el-table id="a-table" :span-method="objectSpanMethod" ref="tableDom" :data="tableData" style="width: 100%"
            max-height="600" :row-class-name="tableRowClassName">
            <el-table-column fixed prop="a" :label="tableHead.a" width="110"/>
            <el-table-column prop="b" :label="tableHead.b" width="100"/>
            <el-table-column prop="c" :label="tableHead.c" width="100"/>
            <el-table-column prop="d" :label="tableHead.d" width="140"/>
            <el-table-column prop="e" :label="tableHead.e" width="140"/>
            <el-table-column prop="f" class-name="result" :label="tableHead.f" width="100"/>
            <el-table-column v-if="formulaShow" prop="ff" :label="tableHead.ff" width="500"/>
            <el-table-column prop="g" :label="tableHead.g" width="100"/>
            <el-table-column prop="h" :label="tableHead.h" width="100"/>
            <el-table-column prop="i" :label="tableHead.i" width="140"/>
            <el-table-column prop="j" :label="tableHead.j" width="140"/>
            <el-table-column prop="k" :label="tableHead.k" width="140"/>
            <el-table-column prop="l" class-name="result" :label="tableHead.l" width="100"/>
            <el-table-column v-if="formulaShow" prop="lf" :label="tableHead.lf" width="500"/>
            <el-table-column prop="m" :label="tableHead.m" width="100"/>
            <el-table-column prop="n" :label="tableHead.n" width="100"/>
            <el-table-column prop="o" :label="tableHead.o" width="100"/>
            <el-table-column prop="p" class-name="result" :label="tableHead.p" width="100"/>
            <el-table-column v-if="formulaShow" prop="q" :label="tableHead.q" width="200"/>
            <el-table-column prop="r" class-name="result" :label="tableHead.r" width="100"/>
        </el-table>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import math from '@/utils/math'
import exportToExcel from "../utils/tools";

const textarea = ref('')
const tableDom = ref(null)
const tableData = ref([])
// 表头
const tableHead = reactive({
    a: '时段',
    b: '月集中竞价相应时段申报电量',
    c: '当月相应时段实际用电量',
    d: '多月及以上火电交易分解至当月相应时段净买入电量',
    e: '新能源双边交易分解至当月相应时段净买入电量',
    f: '用户月集中竞价超额电量',
    ff: '用户月集中竞价超额电量计算公式',
    g: '当旬集中竞价相应时段申报电量',
    h: '当旬相应时段实际用电量',
    i: '多月及以上火电交易分解至当旬相应时段净买入电量',
    j: '月度火电交易分解至当旬相应时段净买入电量',
    k: '新能源双边交易分解至当旬相应时段净买入电量',
    l: '用户旬集中竞价超额电量',
    lf: '用户旬集中竞价超额电量计算公式',
    m: '总净买入电量',
    n: '中长期电价',
    o: '日前月度电价',
    p: '中长期超额申报费用',
    q: '计算公式',
    r: '按小时求和'
})
// formulaShow
const formulaShow = ref(true)
const changeFormulaShow = () => {
    formulaShow.value = !formulaShow.value
}

// 表格样式所系
const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}) => {
    if (columnIndex === 19) {
        if (rowIndex % 4 === 0) {
            return {
                rowspan: 4,
                colspan: 1,
            }
        } else {
            return {
                rowspan: 0,
                colspan: 0,
            }
        }
    }
}

const tableRowClassName = ({
    row,
    rowIndex,
}) => {
    if (rowIndex % 4 === 0) {
        return 'start-row'
    }
    return ''
}

// 数据校验
const dataCheck = () => {
    if (!textarea.value) {
        ElMessage.error('请输入数据')
        return
    }
    let value = JSON.parse(textarea.value)
    let keys = Object.keys(value)
    try {
        value = value?.[keys[0]]
    } catch (error) {
        ElMessage.error('数据格式有误')
    }
    if (!value) {
        return
    }
    return value
}
const preview = () => {
    const data = dataCheck()
    if (!data) {
        return
    }

    let newData = []
    data.forEach(item => {
        let result = computedResult(item)
        newData.push({
            a: item[tableHead.a],
            b: item[tableHead.b],
            c: item[tableHead.c],
            d: item[tableHead.d],
            e: item[tableHead.e],
            f: result?.fv,
            ff: result?.ff,
            g: item[tableHead.g],
            h: item[tableHead.h],
            i: item[tableHead.h],
            j: item[tableHead.h],
            k: item[tableHead.h],
            l: result?.lv,
            lf: result?.lf,
            m: item[tableHead.h],
            n: item[tableHead.h],
            o: item[tableHead.h],
            p: result?.result,
            q: result?.formula
        })
    })
    for (let i = 0; i < newData.length; i += 4) {
        let count = math.addTwo(newData[i].p || 0, math.addTwo(newData[i + 1].p|| 0, math.addTwo(newData[i + 2].p || 0, newData[i + 3].p || 0)))
        newData[i].r = count
        newData[i + 1].r = count
        newData[i + 2].r = count
        newData[i + 3].r = count
    }
    tableData.value = newData
}

const dowload = () => {
    exportToExcel("中长期超额申报费用");
}

const computedResult = (item) => {
    // 用户月集中竞价超额电量
    let fvc = math.subtractTwo(
        math.multiplyTwo(item[tableHead.c], 1.5),
        math.addTwo(item[tableHead.d], math.multiplyTwo(item[tableHead.e], 0.8))
    )
    let fv = math.subtractTwo(item[tableHead.b], math.multiplyTwo(fvc, 1.2))
    let ff = '月集中竞价相应时段申报电量-(当月相应时段实际用电量*1.5-多月及以上火电交易分解至当月相应时段净买入电量-新能源双边交易分解至当月相应时段净买入电量*0.8)*a'
    if(fv <= 0){
        fv = 0
        ff = 'Q用户月集中竞价超额电量,月,h≤0, 按Q用户月集中竞价超额电量,月,h=0计算'
    }else if(item[tableHead.b] <= 0){
        fv = 0
        ff = '月集中竞价相应时段申报电量≤0, Q 用户月集中竞价超额电量,月,h=0计算'
    }else if(fvc <= 0){
        fv = item[tableHead.b]
        ff = '(当月相应时段实际用电量*1.5-多月及以上火电交易分解至当月相应时段净买入电量-新能源双边交易分解至当月相应时段净买入电量*0.8)≤0,按(当月相应时段实际用电量*1.5-多月及以上火电交易分解至当月相应时段净买入电量-新能源双边交易分解至当月相应时段净买入电量*0.8)=0 计算'
    }

    // 用户旬集中竞价超额电量
    let lvc = math.subtractTwo(
        math.multiplyTwo(item[tableHead.h], 1.5),
        math.addTwo(item[tableHead.i], math.addTwo(item[tableHead.j], math.multiplyTwo(item[tableHead.k], 0.8)))
    )
    let lv = math.subtractTwo(item[tableHead.g], math.multiplyTwo(lvc, 1.2))
    let lf = '当旬集中竞价相应时段申报电量-(当旬相应时段实际用电量*1.5-多月及以上火电交易分解至当旬相应时段净买入电量-月度火电交易分解至当旬相应时段净买入电量-新能源双边交易分解至当旬相应时段净买入电量*0.8)*a' 
    if(lv <= 0){
        lv = 0
        lf = 'Q 用户旬集中竞价超额电量,旬,h≤0,按 Q 用户旬集中竞价超额电量,旬,h=0 计算'
    }else if(item[tableHead.g] <= 0){
        lv = 0
        lf = '旬集中竞价相应时段申报电量≤0,Q 用户旬集中竞价超额电量,旬,h=0'
    }else if(fvc <= 0){
        lv = item[tableHead.g]
        lf = '(当旬相应时段实际用电量*1.5-多月及以上火电交易分解至当旬相应时段净买入电量-月度火电交易分解至当旬相应时段净买入电量-新能源双边交易分解至当旬相应时段净买入电量*0.8)≤0,按(当旬相应时段实际用电量*1.5-多月及以上火电交易分解至当旬相应时段净买入电量-月度火电交易分解至当旬相应时段净买入电量-新能源双边交易分解至当旬相应时段净买入电量*0.8)=0 计算'
    }

    let result = null
    let formula = null
    if(item[tableHead.o] > item[tableHead.n]){
        let v = math.addTwo(fv, lv)
        if(v > item[tableHead.m]){
            v = item[tableHead.m]
        }
        result = math.multiplyTwo(v, math.multiplyTwo(1.2, math.subtractTwo(item[tableHead.o], item[tableHead.n])))
        formula = '∑min[(Q 用户月集中竞价超额电量+∑Q 用户旬集中竞价超额电量),(Q 总净买入电量)] *(P 日前月度-P 中长期分时)*1.2'
    }

    return {
        fv,
        ff,
        lv,
        lf,
        result,
        formula
    }
}

</script>

  
<style scoped lang="scss">
.input-card {
    padding: 10px;
    background-color: $bg-color;

    .btn-group {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .dowload, .formula {
        margin-left: 10px;
    }
}

.table-card {
    margin-top: 20px;
    padding: 10px;
    background-color: $bg-color;
    ::v-deep .el-table{
        .start-row {
            --el-table-tr-bg-color: $bg-table-start-row;
            background-color: $bg-table-start-row;
        }
        .result {
            font-weight: $light-font-weight;
            color: $light-color
        }
    }
}
</style>