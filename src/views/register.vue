<template>
    <div class="app-register-page columns is-centered">
        <div class="column is-5-tablet is-4-desktop">

            <!--
            <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                    <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fa fa-check"></i>
                    </span>
                </div>
                <p class="help is-success">This username is available</p>
            </div>
            -->

            <input-text ref="inputName" v-model="form.name" :required="true" label="Name"></input-text>
            <input-text ref="inputUser" v-model="form.user" :required="true" label="User name"></input-text>
            <input-text ref="inputEmail" v-model="form.email" :required="true" label="Email"></input-text>

            <div class="field">
                <a class="button is-primary is-pulled-right">
                    Register
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .app-register-page {

    }
</style>

<script>
  import InputText from '../components/input/text.vue';

  export default {
    components: {
      InputText,
    },
    data() {
      return {
        form: {
          name: '',
          user: '',
          email: '',
        },
      };
    },
  }
</script>
