<template>
    <div>
        <input type="checkbox" id="main-menu-toggle">
        <label for="main-menu-toggle" class="main-menu-menu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </label>
        <div class="menu">
            <div class="menu-inner">
                <ul class="menu-nav">
                    <li class="menu-nav-item"><a class="menu-nav-link" href="#"><span>
                                <div>Home</div>
                            </span></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#main-menu-toggle {
    position: absolute;
    top: 50px;
    appearance: none;
    opacity: 0;

    &:checked {
        &~.menu {
            opacity: 1;
            visibility: visible;

            .menu-nav-link span div,
            img,
            .title p {
                transform: translateY(0);
                transition: 1.2s 0.1s cubic-bezier(0.35, 0, 0.07, 1);
            }
        }

        &~.main-menu-menu {
            .line {
                &::after {
                    transform: translateX(0);
                }

                &:nth-child(1) {
                    transform: translateY(calc(var(--main-menu-menu-radius) / 4.5)) rotate(45deg);
                }

                &:nth-child(2) {
                    transform: scaleX(0);
                }

                &:nth-child(3) {
                    transform: translateY(calc(var(--main-menu-menu-radius) / -4.5)) rotate(-45deg);
                }
            }
        }
    }
}

.main-menu-menu {
    --main-menu-menu-radius: 2.5em;
    background-color: var(--tertiary-color);
    z-index: 1001;
    position: relative;
    top: 10px;
    right: 20px;
    width: var(--main-menu-menu-radius);
    height: var(--main-menu-menu-radius);
    outline: none;
    cursor: pointer;

    .line {
        z-index: 1001;
        margin-bottom: 7px;
        height: 2px;
        width: 20px;
        background: var(--forth-color);
        border-radius: 10px;
        overflow: hidden;
        transition: 0.5s;

        &:nth-child(1) {
            top: 30%;
        }

        &:nth-child(2) {
            top: 50%;
        }

        &:nth-child(3) {
            top: 70%;
        }

        &::after {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color-darker);
            transform: translateX(-100%);
            transition: 0.25s;
        }

        @for $i from 2 through 3 {
            &:nth-child(#{$i})::after {
                transition-delay: 0.1s * ($i - 1);
            }
        }
    }

    &:hover {
        .line::after {
            transform: translateX(0);
        }
    }
}

.menu {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--tertiary-color);
    opacity: 0;
    overflow-x: hidden;
    visibility: hidden;
    transition: 0.3s;


    &-nav {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        text-align: center;
        list-style-type: none;

        &-item {
            flex: 1;
        }

        &-link {
            position: relative;
            display: inline-flex;
            font-size: 2rem;
            color: var(--forth-color);
            text-decoration: none;

            span {
                overflow: hidden;

                div {
                    transform: translateY(102%);
                }
            }

            &::after {
                position: absolute;
                content: "";
                top: 100%;
                left: 0;
                width: 100%;
                height: 3px;
                background: var(--primary-color);
                transform: scaleX(0);
                transform-origin: right;
                transition: transform 0.5s;
            }

            &:hover::after {
                transform: scaleX(1);
                transform-origin: left;
            }
        }
    }

    .title {
        font-size: 24px;
        color: white;
        overflow: hidden;

        p {
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            transform: translateY(102%);
        }
    }
}
</style>