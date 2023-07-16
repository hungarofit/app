<script setup lang="ts">
import IconHungarofit from '@/components/icons/IconHungarofit.vue'
import { BNavbar, BNavbarBrand } from 'bootstrap-vue-next'
</script>

<template>
  <BNavbar variant="primary" dark sticky="top">
    <BNavbarBrand href="https://hungarofit.hu" target="_blank">
      <IconHungarofit />
      Hungarofit
    </BNavbarBrand>
    <BNavText class="text-end">
      <select v-model="$i18n.locale">
        <option v-for="locale in ['hu', 'en']" :key="`locale-${locale}`" :value="locale">
          {{ locale }}
        </option>
      </select>
    </BNavText>
  </BNavbar>
</template>

<style lang="scss">
.navbar-brand {
  svg {
    height: 2rem;
  }
}
</style>
