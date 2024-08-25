<template>
    <div>
        <input 
            :placeholder='placeholder'
            :value = 'modelValue'
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <div v-if="error" class = 'error'>
            {{ error }}
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        placeholder: String,
        modelValue: String,
        error: String
    });
</script>

<style scoped>
    input{
        border-radius: 6px;
        display: flex;
        justify-content: center;
        width: 200px;
        border: 2px solid rgba(0, 0, 0, 0);
        background-color: var(--gray-color);
        box-sizing: border-box;
        padding-left: 14px;
        transition: .2s;
        color: black;
        height: 100%;
    }
    input:focus{
        border: 2px solid var(--blue-color);
    }
    .error{
        font-size: 10px;
        color: red;
        text-align: left;
        padding-left: 6px;
    }
</style>