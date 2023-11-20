<template>
    <div class="input-card box-shadow border-radius">
        <el-input v-model="textarea" :rows="5" type="textarea" placeholder="Please input json" />
        <div class="btn-group">
            <el-button type="primary" @click="preview">预览</el-button>
            <el-button type="primary" class="dowload" @click="dowload">下载</el-button>
        </div>
    </div>
    <div class="table-card box-shadow border-radius">
        <el-table id="a-table" :span-method="objectSpanMethod" ref="tableDom" :data="tableData" style="width: 100%"
            max-height="600" :row-class-name="tableRowClassName">
            <el-table-column fixed prop="a" :label="tableHead.a" />
            <el-table-column prop="b" :label="tableHead.b" />
            <el-table-column prop="c" :label="tableHead.c" />
            <el-table-column prop="d" :label="tableHead.d" />
            <el-table-column prop="e" :label="tableHead.e" />
            <el-table-column prop="f" class-name="result" :label="tableHead.f" />
            <el-table-column prop="g" class-name="result" :label="tableHead.g" />
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
    b: '日前申报量',
    c: '实际用电量',
    d: '日前电价',
    e: '实时电价',
    f: '用户侧超额获利回收',
    g: '按小时求和'
})
const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}) => {
    if (columnIndex === 6) {
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
    let value = null
    try {
        value = JSON.parse(textarea.value)?.Sheet1
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
    console.log(data)

    let newData = []
    data.forEach(item => {
        let result = computedResult(item)
        newData.push({
            a: item[tableHead.a],
            b: item[tableHead.b],
            c: item[tableHead.c],
            d: item[tableHead.d],
            e: item[tableHead.e],
            f: result
        })
    })
    for (let i = 0; i < newData.length; i += 4) {
        let count = math.addTwo(newData[i].f || 0, math.addTwo(newData[i + 1].f || 0, math.addTwo(newData[i + 2].f || 0, newData[i + 3].f || 0)))
        newData[i].g = count
        newData[i + 1].g = count
        newData[i + 2].g = count
        newData[i + 3].g = count
    }
    tableData.value = newData
}

const dowload = () => {
    exportToExcel("用户侧超额获利回收");
}

const computedResult = (item) => {
    if (item[tableHead.b] > math.multiplyTwo(item[tableHead.c], 1.2) && item[tableHead.e] > item[tableHead.d]) {
        return math.multiplyTwo(
            math.subtractTwo(item[tableHead.b], math.multiplyTwo(item[tableHead.c], 1.2)),
            math.subtractTwo(item[tableHead.e], item[tableHead.d]))
    }
    if (item[tableHead.b] < math.multiplyTwo(item[tableHead.c], 0.8) && item[tableHead.e] < item[tableHead.d]) {
        return math.multiplyTwo(
            math.subtractTwo(math.multiplyTwo(item[tableHead.c], 0.8), item[tableHead.b]),
            math.subtractTwo(item[tableHead.d], item[tableHead.e]))
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

    .dowload {
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