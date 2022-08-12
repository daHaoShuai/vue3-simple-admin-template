<script lang="tsx">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
    setup() {
        const arr = reactive(['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'])
        return () => (
            <div className="test">
                <ul>{
                    arr.map(item => <li style={{ listStyle: 'none' }}>{item}</li>)
                }</ul>
            </div>
        )
    }
})
</script>

<style scoped>
.test {
    background-color: blueviolet;
    color: #fff;
}
</style>