<template>
    <router-link :to="url" class="btn">
        <svg v-if="backgroundTheme == 'light'" width="150" height="52">
            <defs>
                <linearGradient id="grad1">
                    <stop offset="0%" style="stop-color: var(--primary-color)" />
                    <stop offset="100%" style="stop-color: var(--tertiary-color)" />
                </linearGradient>
            </defs>
            <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="140" height="40"></rect>
        </svg>
        <svg v-if="backgroundTheme == 'dark'" width="150" height="52">
            <defs>
                <linearGradient id="grad2">
                    <stop offset="0%" style="stop-color: var(--secondary-color)" />
                    <stop offset="100%" style="stop-color: var(--forth-color)" />
                </linearGradient>
            </defs>
            <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad2)" width="140" height="40"></rect>
        </svg>
        <span :class="backgroundTheme == 'light' ? 'light' : 'dark'">{{ text }}</span>
    </router-link>
</template>

<script>

export default {
    name: 'LinkButton',
    props: {
        text: {
            type: String,
            default: '',
            required: true,
        },
        url: {
            type: String,
            default: '',
            required: true,
        },
        backgroundTheme: {
            type: String,
            default: '',
            required: true,

        }
    },
}
</script>

<style lang="scss">
.btn {
    display: block;
    z-index: 3;
    width: 150px;
    height: 52px;
    line-height: 20px;
    text-align: center;
    text-transform: uppercase;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    font-weight: 100;
    font-size: 14px;
    letter-spacing: 0.045em;
}

.btn svg rect {
    stroke-width: 1;
    transition: all 600ms ease;
    filter: drop-shadow(2px 2px 2px var(--primary-color));
}

.btn span {
    position: relative;
    top: -80%;
    left: 0%;
    width: 40px;
    height: 30px;
    background-color: var(--welcome-span-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.btn span.dark {
    background-color: #eeeee1;
}

.btn:hover svg rect {
    stroke-width: 1;
    stroke-dasharray: 100, 480;
    stroke-dashoffset: 424;
}
</style>

<style lang="scss">
@import "../../assets/css/variables/global.scss";

@media (max-width: 1380px) {

    .btn {
        width: 100px;
        height: 42px;
        line-height: 20px;
        font-weight: 100;
        font-size: 12px;
    }

    .btn svg rect {
        width: 90px;
        height: 30px;
    }

    .btn svg {
        width: 111px;
        height: 51px;
    }

    .btn span {
        position: relative;
        top: -110%;
        left: 0%;
    }

    .btn:hover svg rect {
        stroke-dasharray: 75, 445;
        stroke-dashoffset: 434;
    }
}
</style>