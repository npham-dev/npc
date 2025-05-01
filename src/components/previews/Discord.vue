<script setup lang="ts">
import { RiCircleFill } from '@remixicon/vue';
import { PALETTE } from '../Canvas/Canvas';
import Avatar from '../Avatar.vue';

const bgColor = PALETTE.FILL
</script>

<template>
    <div class="card view">
        <div class="card__background">
            <div class="card__background__avatar">
                <div>
                    <Avatar />
                </div>
            </div>
        </div>
        <div class="card__content view">
            <h1 class="card__content__title">Nathan</h1>
            <div class="card__content__subtitle">
                <p>natmfat</p>
                <RiCircleFill size="6px"/>
                <p>he/him</p>
            </div>
            <div class="card__content_bio">
                <a href="https://natmfat.com" target="_blank" rel="noreferrer">https://natmfat.com/</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    border-radius: 0.5rem;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    border: 1px solid #eee;
}


.card__background {
    align-items: center;
    background-color: v-bind(bgColor);
    width: 100%;
    height: 100%;
}

.card__background__avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    transform: translateY(50%) translateX(1rem);
    border: 0.3rem solid white;
    position: relative;
}

.card__background__avatar > div {
    border-radius: 50%;
    overflow: hidden;
}

.card__background__avatar::after {
    content: "";
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 100%;
    border: 0.3rem solid white;
    background-color: #40a258;
    position: absolute;
    bottom: 0;
    right: 0;
}

.card__content {
    padding: 1rem;
    padding-top: 2rem;
    gap: 0.25rem;
    flex-direction: column;
}

.card__content__title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.card__content__subtitle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #666;
}

.card__content__subtitle p {
    margin: 0;
}

.card__content_bio {
}

.card__content_bio a {
    color: #007bff;
    text-decoration: none;
    font-size: 0.875rem;
}

.card__content_bio a:hover {
    text-decoration: underline;
}
</style>