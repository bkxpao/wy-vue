<template>
    <div>
        <div class="dialog-wrap" v-if="isShow">
            <div class="dialog-cover"></div>
            <div class="dialog-content">
                <p class="dialog-close" @click="close()">x</p>
                <slot>empty</slot>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                nowIndex: 0
            }
        },
        methods: {
            close () {
                this.$emit('on-close');
            }
        }
    }
</script>

<style scoped>
    .drop-enter-active {
        transition: all .5s ease;
    }

    .drop-leave-active {
        transition: all .3s ease;
    }

    .drop-enter {
        transform: translateY(-500px);
    }

    .drop-leave-active {
        transform: translateY(-500px);
    }

    .dialog-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
    }

    .dialog-cover {
        background: #000;
        opacity: .3;
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .dialog-content {
        width: 1000px;
        position: fixed;
        height: 600px;
        overflow: auto;
        background: #fff;
        top: 10%;
        left: 50%;
        margin-left: -25%;
        z-index: 10;
        border: 2px solid #464068;
        padding: 2%;
        line-height: 1.6;
    }

    .dialog-close {
        position: absolute;
        right: 5px;
        top: 5px;
    }
</style>
