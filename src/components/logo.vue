
<style lang="scss">
    @import './../styles/variables';

    .app-logo {
        width: 38px;
        height: 38px;

        .app-logo-head,
        .app-logo-body {
            stroke-width: 36;
            stroke: $white;
        }

        .app-logo-head {
            fill: $primary;
        }

        .app-logo-body {
            fill: $green;
        }

        .app-logo-circle {
            fill: $white;
        }
    }
</style>

<template>
    <svg class="app-logo" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g>
            <ellipse class="app-logo-circle"
                     rx="240" ry="240"
                     cx="256" cy="256">
            </ellipse>
            <ellipse class="app-logo-body"
                     rx="156" ry="156"
                     cx="256" cy="320">
            </ellipse>
            <ellipse class="app-logo-head"
                     rx="102" ry="102"
                     cx="256" cy="136">
            </ellipse>
        </g>
    </svg>
</template>

<script>
    export default { }
</script>
