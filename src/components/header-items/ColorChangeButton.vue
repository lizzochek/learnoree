<template>
    <div class='toggle-switch'>
        <label>
            <input type='checkbox'>
            <span class='slider' @click="changeStyle"></span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'ColorChangeButton',
    methods: {
        changeStyle() {
            const mode = localStorage.getItem('mode');
            localStorage.setItem("mode", mode === 'light' ? 'dark' : 'light');
            window.location.reload();
        }
    }
} 
</script>

<style scoped>
.toggle-switch {
    position: relative;
    width: 50px;
}

label {
    position: absolute;
    width: 100%;
    height: 20px;
    margin-left: 30px;
    background-color: var(--forth-color);
    border-radius: 20px;
    cursor: pointer;
}

input {
    position: absolute;
    display: none;
}

.slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 13px;
    transition: 0.3s;
    box-shadow: 0 3px 5px 0 var(--primary-color), 3px 3px 5px 0 var(--primary-color);
}

input:checked~.slider {
    background-color: var(--primary-color);
}

.dark-mode .slider::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: inset 6px -4px 0px 0px var(--primary-color);
    background-color: var(--forth-color);
    transition: 0.3s;
}

.dark-mode input:checked~.slider::before {
    transform: translateX(28px);
    background-color: var(--forth-color);
    box-shadow: none;
}

.light-mode .slider::before {
    content: "";
    position: absolute;
    top: 2.5px;
    left: 32px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: inset 20px 0px 0px 0px var(--primary-color);
    background-color: var(--forth-color);
    transition: 0.3s;
}

.light-mode input:checked~.slider::before {
    transform: translateX(-28px);
    background-color: var(--forth-color);
}
</style>