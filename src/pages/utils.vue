<template>
    <div class="utils-card box-shadow border-radius">
        <div class="row border-radius">
            <div class="text">表格转json：https://wejson.cn/excel2json/</div>
            <div class="btn"><a href="https://wejson.cn/excel2json" target="_blank">点击跳转</a></div>
        </div>
    </div>
</template>

<script setup>

</script>

  
<style scoped lang="scss">
.utils-card{
    padding: 10px;
    background-color: $bg-color;
    .row{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        &:hover{
            background-color: $bg-color-hover;
        }
        .text{
            font-size: $font-size;
            color: $color;
        }
        .btn{
            font-size: $font-size;
            color: $btn-color;
        }
    }
}
</style>