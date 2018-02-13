<template>
    <nav class="app-navbar navbar is-primary">
        <div class="navbar-brand">
            <router-link class="navbar-item"
                         :to="{name:'index'}">
                <logo></logo>
            </router-link>

            <!--
            <a class="navbar-item is-hidden-desktop" href="https://github.com/RuinSain" target="_blank">
              <span class="icon" style="color: #333;">
                <i class="fa fa-github"></i>
              </span>
            </a>
            -->

            <div class="navbar-burger burger"
                 :class="{'is-active':isOpen}"
                 @click="isOpen = !isOpen">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="navbar-menu"
             :class="{'is-active':isOpen}">
            <div class="navbar-start">

                <!--
                <a class="navbar-item"
                   href="#">
                    All Articles
                </a>
                -->

                <div class="navbar-item has-dropdown is-hoverable">
                    <div class="navbar-link">
                        Blog
                    </div>

                    <div class="navbar-dropdown">

                        <div class="navbar-item"
                             v-show="rssFeed.length<1 && !rssFetching">
                            <div class="navbar-content">
                                <p>No items in feed</p>
                            </div>
                        </div>

                        <div class="navbar-item"
                             v-show="rssFetching">
                            <div class="navbar-content">
                                <p>
                                    Fetching feed
                                    <span class="icon">
                                        <i class="fa fa-spinner fa-spin"></i>
                                    </span>
                                </p>
                            </div>
                        </div>

                        <a v-for="i in rssFeed"
                           :href="i.link"
                           class="navbar-item">
                            <div class="navbar-content">
                                <p>
                                    <small class="has-text-info">
                                        {{ i.date }}
                                    </small>
                                </p>
                                <p class="navbar-feed-title"
                                   v-html="i.title">
                                </p>
                            </div>
                        </a>

                        <hr class="navbar-divider">
                        <div class="navbar-item">
                            <div class="navbar-content">
                                <div class="level is-mobile">
                                    <div class="level-left">
                                        <div class="level-item">
                                            <strong v-html="$gettext('SubscribeTitle')"></strong>
                                        </div>
                                    </div>
                                    <div class="level-right">
                                        <div class="level-item">
                                            <a class="button is-rss is-small"
                                               href="https://hungarofit.hu/feed"
                                               type="application/rss+xml"
                                               rel="alternate">
                                                  <span class="icon is-small">
                                                    <i class="fa fa-rss"></i>
                                                  </span>
                                                <span v-html="$gettext('Subscribe')"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--
            <div class="navbar-end">

                <router-link class="navbar-item"
                             :to="{name:'register'}"
                             v-html="$gettext('Register')">
                </router-link>

                <router-link class="navbar-item"
                             :to="{name:'login'}"
                             v-html="$gettext('Login')">
                </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link"
                       v-html="$gettext('User')">
                    </a>
                    <div class="navbar-dropdown">
                        <router-link class="navbar-item"
                                     :to="{name:'profile'}"
                                     v-html="$gettext('MyProfile')">
                        </router-link>
                        <a href="#"
                           class="navbar-item"
                           v-html="$gettext('Logout')">
                        </a>
                    </div>
                </div>

            </div>
            -->

        </div>
    </nav>
</template>

<style lang="scss">
    @import './../styles/variables';
    @import './../../node_modules/bulma/sass/utilities/mixins';

    .app-navbar {
        z-index: 1000;

        @include touch {
            & {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
            }

            .navbar-menu {
                overflow: hidden;
                display: block;
                position: absolute;
                bottom: 110%;
                right: 0;
                min-height: 0;
                max-height: 0;
                opacity: 0;
                transition: all .4s ease-in-out;
                -webkit-transition: all .4s ease-in-out;

                &.is-active {
                    bottom: 100%;
                    opacity: 1;
                    max-height: 9999px;
                }
            }
        }

        .navbar-feed-title {
            font-size: 0.78rem;
            white-space: pre-line;
            max-width: 420px;
        }

        .navbar-burger {
            height: auto;
        }
    }
</style>

<script>
  import Logo from './logo.vue';

  export default {
    components: {
      Logo,
    },
    data() {
      return {
        isOpen: false,
        rssFetching: false,
        rssFeed: [],
      };
    },
    methods: {
      onClickOutside(evt) {
        if(!evt.target.closest('.app-navbar')) {
          this.isOpen = false;
        }
      }
    },
    created() {
      this.rssFetching = true;
      this.$http.get(this.$apiUrl('/rss')).then(
        r => {
          if(r.body.status === 'OK') {
            this.rssFeed = r.body.response;
          }
          else {
            throw r.body.error;
          }
        },
        console.error
      ).finally(() => {
        this.rssFetching = false;
      });
    },
    mounted() {
      document.addEventListener('click', this.onClickOutside);
    },
    beforeDestroy() {
      this.isOpen = false;
      document.removeEventListener('click', this.onClickOutside);
    },
  }
</script>
