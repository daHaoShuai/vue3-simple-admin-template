<template>
    <div class="w-full h-full flex justify-center items-center bg-black text-white">
        <div>
            <div flex="~" v-for="row, y in state" :key="y">
                <button :class="getBlockClass(item)" v-for="item, x in row" w-10 border="1 gray-400/10" flex="~"
                    bg-black items-center justify-center h-10 m="0.5" :key="x" @contextmenu.prevent="onRightClick(item)"
                    @click="onClick($event, item)">
                    <template v-if="item.flagged">
                        <div>📌</div>
                    </template>
                    <template v-else-if="item.revealed || dev">
                        <div v-if="item.mine">
                            💥
                        </div>
                        <div v-else>
                            {{ item.adjacentMines }}
                        </div>
                    </template>
                </button>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { BlockState } from './types'

const WIDTH = 3
const HEIGHT = 3
let mineGenerated = false
let dev = false

const state = ref(Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH }, (_, x): BlockState => ({
        x,
        y,
        revealed: false,
        adjacentMines: 0
    }))
))

const numberColors = [
    'text-transparent',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-orange-500',
    'text-red-500',
    'text-purple-500',
    'text-pink-500',
    'text-teal-500',
]

const getBlockClass = (block: BlockState) => {
    if (block.flagged) return 'bg-gray-500/10'
    if (!block.revealed) return 'bg-gray-500/10 hover:bg-gray-100/20'
    return block.mine ? 'bg-red-500/50' : numberColors[block.adjacentMines]
}

const directions = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1]
]

const getSiblings = (block: BlockState) => {
    return directions.map(([dx, dy]) => {
        const x2 = block.x + dx
        const y2 = block.y + dy
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
            return undefined
        }
        return state.value[y2][x2]
    }).filter(Boolean) as BlockState[]
}

// 更新格子的值
const updateNumbers = () => {
    state.value.forEach((row, y) => {
        row.forEach((block, x) => {
            if (block.mine) {
                return
            }
            getSiblings(block).forEach(b => {
                if (b.mine) {
                    block.adjacentMines += 1
                }
            })
        })
    })
}

// 点到0时,把所有是0的格子展开
const expendZero = (block: BlockState) => {
    if (block.adjacentMines) {
        return
    }
    getSiblings(block).forEach(s => {
        if (!s.revealed) {
            s.revealed = true
            expendZero(s)
        }
    })
}

// 生成地雷
const generateMines = (initial: BlockState) => {
    for (const row of state.value) {
        for (const block of row) {
            if (Math.abs(initial.x - block.x) < 1) {
                continue
            }
            if (Math.abs(initial.y - block.y) < 1) {
                continue
            }

            block.mine = Math.random() < 0.3
        }
    }
    updateNumbers()
}

const checkGameState = () => {
    if (!mineGenerated) return
    const blocks = state.value.flat()
    if (blocks.every(block => block.revealed || block.flagged)) {
        if (blocks.some(block => block.flagged && !block.mine)) {
            alert('你输了')
        } else {
            alert('你赢了')
        }
    }
}

watchEffect(checkGameState)

const onRightClick = (block: BlockState) => {
    if (block.revealed) return
    block.flagged = !block.flagged
}

const onClick = (e: MouseEvent, block: BlockState) => {
    console.log(e);

    // 第一次点击的时候生成
    if (!mineGenerated) {
        generateMines(block)
        mineGenerated = true
    }
    block.revealed = true
    if (block.mine) {
        alert('boom')
    }
    expendZero(block)
}
</script>