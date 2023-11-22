<template>
    <div class="utils-card border-radius">
        <div class="link box-shadow border-radius">
            <div class="row border-radius">
                <div class="text">表格转json：https://wejson.cn/excel2json/</div>
                <div class="btn"><a href="https://wejson.cn/excel2json" target="_blank">点击跳转</a></div>
            </div>
        </div>
        <calculator />
    </div>
</template>

<script setup>
import calculator from '@/components/calculator.vue'
</script>
  
<style scoped lang="scss">
.utils-card{
    display: flex;
    align-items: flex-start;
    .link{
        flex:1;
        background-color: $bg-color;
        margin-right: 20px;
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
}
</style>