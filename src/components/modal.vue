<template>
    <div class="modal show"
         v-if="value">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button"
                            class="close"
                            @click="$emit('input', false)">
                        &times;
                    </button>
                    <slot name="header">
                        <h4 class="modal-title">Title goes here</h4>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        <p>Body goes heere&hellip;</p>
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button type="button"
                                class="btn btn-default"
                                @click="$emit('input', false)">
                            <translate>Close</translate>
                        </button>
                        <button type="button"
                                class="btn btn-primary"
                                @click="$emit('save')">
                            <translate>Save changes</translate>
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .modal {
        max-height: 100%;
        overflow-y: scroll;
        background-color: rgba(0, 0, 0, .3);
        transition: opacity .3s ease;
    }
</style>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      }
    },
    watch: {
      value(shown) {
        const body = document.getElementsByTagName('body')[0];
        if(shown) {
          body.classList.add('modal-open');
        }
        else {
          body.classList.remove('modal-open');
        }
      }
    },
  }
</script>