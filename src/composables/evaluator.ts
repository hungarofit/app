import { ref } from 'vue'

export function useEvaluator() {
  const loading = ref<boolean>(false)

  async function evaluate() {}

  return {
    loading
  }
}
