<template>
    <div class="calculator box-shadow border-radius">
        <div class="monitor">
            <div class="monitor-text border-radius" v-html="calculatorInputHtml"></div>
        </div>
        <div class="operate">
            <div v-for="(calculatorItem, calculatorIndex) in calculatorOperate" :key="calculatorIndex" class="row">
                <div v-for="(item, index) in calculatorItem" :key="calculatorIndex + '-' + index" class="item">
                    <div @click="clickCalculator(item.text)"
                        :class="['item-text', item.type === 'operator' ? 'item-operator' : '']">{{ item.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import math from '@/utils/math'

// 计算器
let cursorIndex = 0
let calculatorInput = ''
const calculatorInputHtml = ref('')
const calculatorOperate = ref([
    [
        {
            text: 'AC',
            type: 'operator'
        },
        {
            text: '(',
            type: 'operator'
        },
        {
            text: ')',
            type: 'operator'
        },
        {
            text: '%',
            type: 'operator'
        },
    ],
    [
        {
            text: 'Del',
            type: 'operator'
        },
        {
            text: '<-',
            type: 'operator'
        },
        {
            text: '->',
            type: 'operator'
        },
        {
            text: '/',
            type: 'operator'
        },
    ],
    [
        {
            text: '7'
        },
        {
            text: '8'
        },
        {
            text: '9'
        },
        {
            text: '*',
            type: 'operator'
        },
    ],
    [
        {
            text: '4'
        },
        {
            text: '5'
        },
        {
            text: '6'
        },
        {
            text: '-',
            type: 'operator'
        },
    ],
    [
        {
            text: '1'
        },
        {
            text: '2'
        },
        {
            text: '3'
        },
        {
            text: '+',
            type: 'operator'
        },
    ],
    [
        {
            text: '00'
        },
        {
            text: '0'
        },
        {
            text: '.'
        },
        {
            text: '=',
            type: 'operator'
        },
    ],
])
const clickCalculator = (text) => {
    let arr = calculatorInput.split('');
    switch (text) {
        case '<-':
            if (cursorIndex > 0) {
                cursorIndex -= 1
            }
            break
        case '->':
            if (cursorIndex < arr.length) {
                cursorIndex += 1
            }
            break
        case 'AC':
            cursorIndex = 0
            calculatorInput = ''
            break
        case 'Del':
            console.log(arr)
            arr.splice(cursorIndex - 1, 1);
            calculatorInput = arr.join('');
            console.log(calculatorInput)

            cursorIndex -= 1
            break
        case '=':
            break
        default:
            arr.splice(cursorIndex, 0, text);
            calculatorInput = arr.join('');

            cursorIndex += text.length
            break
    }

    if (text === '=') {
        console.log(calculatorInput)
        calculatorInputHtml.value = math.evaluate(calculatorInput)
        cursorIndex = 0
        calculatorInput = ''
    } else {
        let newArr = calculatorInput.split('');
        newArr.splice(cursorIndex, 0, '<span></span>');
        calculatorInputHtml.value = newArr.join('');
    }
}
</script>

  
<style scoped lang="scss">
.calculator {
    background-color: $bg-color;
    width: 400px;
    padding: 20px 10px;

    .monitor {
        position: relative;

        .monitor-text {
            border: 1px solid #666;
            min-height: 40px;
            padding: 10px;
            word-wrap: break-word;
            font-size: 16px;
            line-height: 20px;
            letter-spacing: 2px;

            ::v-deep span {
                display: inline-block;
                vertical-align: middle;
                height: 20px;
                width: 2px;
                margin: 0 2px;
                background-color: $light-color;
                animation: flicker 1s infinite;
            }
        }

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-color: transparent;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
    }

    .operate {
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .item {
                flex: 1;

                .item-text {
                    margin: 20px auto 0;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: rgba(66, 66, 66, 0.7);
                    color: #fff;
                    line-height: 60px;
                    text-align: center;
                    font-size: 20px;
                    cursor: pointer;
                }

                .item-operator {
                    background-color: rgba(228, 165, 30, 0.7);
                }
            }
        }
    }
}

@keyframes flicker {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}</style>