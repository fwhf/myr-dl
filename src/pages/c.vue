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
            <el-table-column prop="b" :label="tableHead.b" />
            <el-table-column prop="c" :label="tableHead.c" />
            <el-table-column prop="d" :label="tableHead.d" />
            <el-table-column prop="e" :label="tableHead.e" />
            <el-table-column prop="f" :label="tableHead.f" />
            <el-table-column prop="g" :label="tableHead.g" />
            <el-table-column prop="h" :label="tableHead.h" />
            <el-table-column prop="i" class-name="result" :label="tableHead.f" />
            <el-table-column v-if="formulaShow" prop="j" :label="tableHead.g" width="400"/>
            <el-table-column prop="k" class-name="result" :label="tableHead.h" />
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
    b: '多月及以上净买入',
    c: '新能源双边',
    d: '月集中申报',
    e: '旬集中申报',
    f: '用电',
    g: '中长期电价',
    h: '日前月度电价',
    i: '中长期缺额回收费用（分时）',
    j: '计算公式',
    k: '按小时求和'
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
    let columnNum = 10
    if(!formulaShow.value){
        columnNum = 9
    }
    if (columnIndex === columnNum) {
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
            f: item[tableHead.f],
            g: item[tableHead.g],
            h: item[tableHead.h],
            i: result?.result,
            j: result?.formula
        })
    })
    for (let i = 0; i < newData.length; i += 4) {
        let count = math.addTwo(newData[i].i || 0, math.addTwo(newData[i + 1].i|| 0, math.addTwo(newData[i + 2].i || 0, newData[i + 3].i || 0)))
        newData[i].k = count
        newData[i + 1].k = count
        newData[i + 2].k = count
        newData[i + 3].k = count
    }
    tableData.value = newData
}

const dowload = () => {
    exportToExcel("中长期缺额回收费用（分时）");
}

const computedResult = (item) => {
    let bcde = math.addTwo(item[tableHead.b], math.addTwo(item[tableHead.c], math.addTwo(item[tableHead.d], item[tableHead.e])))
    if(bcde < math.multiplyTwo(item[tableHead.f], 0.9) && item[tableHead.g] > item[tableHead.h]){
        let result = math.multiplyTwo(
                math.subtractTwo(math.multiplyTwo(item[tableHead.f], 0.9), bcde),
                math.multiplyTwo(math.subtractTwo(item[tableHead.g], item[tableHead.h]), 1.5))
        let formula = '(0.9 * 用电 - 多月及以上净买入 - 新能源双边 - 月集中申报 - 旬集中申报) * (中长期电价 - 日前月度电价) * 1.5'
        return {
            result,
            formula
        }
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