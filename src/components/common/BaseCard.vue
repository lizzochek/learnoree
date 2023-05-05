<template>
    <div class="card">
        <slot></slot>
    </div>
</template>
  
<style scoped>
.card {
    background-color: var(--forth-color);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(208, 189, 189, 0.26);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 40rem;
    height: 80%;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
}
</style>