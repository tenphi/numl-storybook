<template>
  <nu-block
    responsive="980px|600px" display="flow-root" font="Quicksand"
    :style="previewProps" v-show="mounted" width="100%"
    overflow="scroll-y" text="n" size="md"
    :height="$route.path.startsWith('/repl') ? '100vh' : null">
    <nu-attrs for="blockquote"/>
    <nu-attrs for="code" font="Roboto Mono"/>
    <nu-attrs for="cd" font="Roboto Mono"/>
    <nu-props
      xxs-line-height="20rp"
      xs-line-height="20rp"
      sm-line-height="26rp"
      md-line-height="26rp"
      lg-line-height="30rp"
      xl-line-height="34rp"
      xxl-line-height="38rp"
      normal-font-weight="500"
      semi-bold-font-weight="600"
      bold-font-weight="700"
      heading-font-weight="700"/>
    <nu-theme
      :hue="hue" :pastel="pastel"
      :saturation="saturationType === 'auto' ? null : saturation"/>
    <nu-theme
      name="content" :hue="hue" :pastel="pastel"
      :saturation="saturationType === 'auto' ? null : saturation"
      :mod="themeType === 'main' ? '' : themeType"/>

    <template v-if="$route.path !== '/repl'">
      <nu-grid
        width="initial 27 100vw"
        place="fixed left"
        height="100%"
        columns="10 1fr"
        z="front"
        fill="subtle|subtle 70%"
        backdrop="blur(2x)"
        shadow="0|1"
        overflow="no"
        :move="showMenu ? '0 0' : '0 0|(-100% - 1x) 0'"
        transition="move ease-out">
        <nu-block
          ref="nav" id="nav" padding="1x" border="right" text="center" overflow="auto">
          <nu-flex gap height="100%| " flow="column" padding="0|4 bottom">
            <nu-blocklink
              to="/"
              hoverable="no"
              id="logo" padding="2x 4x 0" theme="special :hover[special strong]"
              transition="shadow">
              <nu-svg width="100%" height src="/img/icon.svg"></nu-svg>
            </nu-blocklink>
            <nu-block text="nowrap monospace w7" size="xs">
              numl@{{ version }}
            </nu-block>
            <nu-line></nu-line>
            <nu-block grow="1">
              <nu-flow
                text="h" size="md" flow="column" gap=".5x">
                <nu-attrs
                  for="nu-btn"
                  border="0"
                  width="100%"
                  theme=":current[special]"
                  fill=":current[bg] clear"
                  inset="0 :active:focusable[y] :pressed[0]"
                ></nu-attrs>
                <nu-btn
                  value="storybook" to="/storybook"
                  :is-current="isCurrentSection('storybook')">
                  Storybook
                </nu-btn>
                <nu-btn
                  value="guide" to="/guide/what-is-numl"
                  :is-current="isCurrentSection('guide')">
                  Guide
                </nu-btn>
                <nu-btn
                  value="reference" to="/reference/elements/nu-el"
                  :is-current="isCurrentSection('reference')">
                  Reference
                </nu-btn>
                <nu-btn
                  value="framework" to="/framework/what-is-nude"
                  :is-current="isCurrentSection('framework')">
                  Framework
                </nu-btn>
                <nu-btn
                  value="repl" to="/repl"
                  :is-current="isCurrentSection('repl')">
                  REPL
                </nu-btn>
              </nu-flow>
            </nu-block>
            <nu-line></nu-line>
            <nu-btn
              special
              to="!https://gitter.im/tenphi/numl?utm_source=share-link&utm_medium=link&utm_campaign=share-link">
              <nu-icon name="message-circle"></nu-icon>
              Join Chat
            </nu-btn>
          </nu-flex>
        </nu-block>

        <nu-flow
          id="subnav" padding="0 2x 6x||0 1x 6x" gap="0" border="right" overflow="auto">
          <nu-attrs
            for="nu-heading" padding="1x 2x"
            level="4" place="sticky top" space="-2x 2x||-2x 1x" fill="subtle"
            z="above" border="bottom" fade="top" size="h4||h"></nu-attrs>
          <nu-attrs
            for="nu-link" display="block" border="0"
            padding=".5x 1x" mark="hover"></nu-attrs>
          <template
            v-for="(item, i) in subMenu">
            <nu-link
              v-if="item.type === 'link'"
              :key="`${item.label}:${i}`"
              :to="item.to"
              :theme="item.to === $route.path ? 'special' : null"
              :fill="item.to === $route.path ? 'bg' : 'clear'"
              text="n sb ellipsis">
              {{ item.label }}
            </nu-link>
            <nu-heading v-if="item.type === 'heading'" :key="item.label">
              {{ item.label }}
            </nu-heading>
            <nu-spacer v-if="item.type === 'heading'" :key="item.label + 'spacer'"></nu-spacer>
            <nu-block v-if="item.type === 'text'" :key="item.label">
              {{ item.label }}
            </nu-block>
          </template>
        </nu-flow>
      </nu-grid>

      <nu-flex
        id="content"
        @click="focusContent"
        padding="0 0 0 27|0" height="min 100vh" fill="bg" items="center start" flow="column"
        :opacity="showMenu ? '1|.66' : 1" transition="opacity" theme="content">

        <nu-flow
          responsive="1180px|980px|720px"
          width="initial 100% 54" gap="2x"
          :interactive="showMenu ? 'y|n' : 'y'">
          <nu-flow padding="2 2 6|2 1 6|2 2 6|2 1 6" gap="2x">
            <router-view height="min (100vh - 26x)"/>

            <nu-line></nu-line>

            <nu-pane
              v-if="navLinks"
              content="space-between"
              flow="row wrap">
              <nu-btn
                v-if="navLinks.prev"
                :to="navLinks.prev.to"
                clear text="sb">
                <nu-icon name="arrow-left" space="left"></nu-icon>
                {{navLinks.prev.heading}}:
                {{navLinks.prev.label}}
              </nu-btn>
              <nu-el v-else></nu-el>

              <nu-btn
                v-if="navLinks.next"
                :to="navLinks.next.to"
                clear text="sb">
                {{navLinks.next.heading}}:
                {{navLinks.next.label}}
                <nu-icon name="arrow-right" space="right"></nu-icon>
              </nu-btn>
            </nu-pane>
          </nu-flow>
        </nu-flow>
      </nu-flex>

      <nu-btn
        toggle
        :checked="showMenu"
        show="n|y"
        @input="toggleMenu($event.detail)"
        special place="fixed left bottom 1" z="front" padding shadow=".5">
        <nu-icon name="^:pressed[x] menu"></nu-icon>
      </nu-btn>
    </template>

    <template v-else>
      <router-view/>
    </template>

    <nu-block
      ref="settings"
      place="fixed right"
      height="100% + 1bw"
      width="20"
      border="left"
      fill="bg 70%"
      backdrop="blur(1)"
      z="front"
      shadow="1"
      :move="showSettings ? '0 0' : '(100% + 1x) 0'"
      transition="move ease-out"
      padding
      overflow="auto"
      scrollbar
    >
      <nu-props
        gap=".5rem"
        border-width="1px"
        radius=".5rem"
        transition-time="80ms"></nu-props>

      <nu-flex flow="column" gap>
        <nu-card>
          <nu-flow gap>
            <nu-pane>
              <nu-heading level="6">Global Theme</nu-heading>
              <nu-flex gap items="center">
                <nu-checkbox
                  :checked="pastel"
                  @input="pastel = $event.detail"
                  labelledby=":next"></nu-checkbox>
                <nu-label>Pastel palette</nu-label>
              </nu-flex>
            </nu-pane>
            <nu-grid gap="1x 2x" items="center stretch" columns="auto 1fr 4x">
              <nu-el place="center end">Hue</nu-el>
              <nu-slider
                :value="hue" @input="hue = $event.detail" type="int"
                min="0" max="359"
                image="linear(to right, hue(0 s), hue(90 s), hue(180 s), hue(270 s), hue(0 s))">
              </nu-slider>
              <nu-el>{{ hue }}</nu-el>

              <nu-el place="center end">Saturation</nu-el>
              <nu-slider
                :disabled="saturationType === 'auto'"
                :value="saturation" @input="saturation = $event.detail" type="int"
                min="0" max="100"
                :image="`linear(to right, hue(${hue} 0 ${
                  pastel ? 'pastel' : ''}), hue(${hue} 100 ${
                  pastel ? 'pastel' : ''}))`"></nu-slider>
              <nu-el>{{ saturation }}</nu-el>
              <nu-el></nu-el>
              <nu-block column="auto / span 2">
                <nu-radiogroup
                  :value="saturationType" @input="saturationType = $event.detail"
                  display="flex" gap="2x">
                  <nu-flex gap items="center">
                    <nu-radio value="auto" labelledby=":next"></nu-radio>
                    <nu-label>Auto</nu-label>
                  </nu-flex>
                  <nu-flex gap items="center">
                    <nu-radio value="custom" labelledby=":next"></nu-radio>
                    <nu-label>Custom</nu-label>
                  </nu-flex>
                </nu-radiogroup>
              </nu-block>
            </nu-grid>
          </nu-flow>
        </nu-card>

        <nu-card>
          <nu-attrs for="btn" padding></nu-attrs>

          <nu-heading level="6" padding="bottom">Content theme type</nu-heading>

          <nu-btngroup
            :value="themeType" @input="themeType = $event.detail" size="xs" items-padding>
            <nu-btn value="main">Main</nu-btn>
            <nu-btn value="tint">Tint</nu-btn>
            <nu-btn value="tone">Tone</nu-btn>
            <nu-btn value="swap">Swap</nu-btn>
            <nu-btn value="special">Special</nu-btn>
          </nu-btngroup>
        </nu-card>

        <nu-card>
          <nu-heading level="6" padding="bottom">Preview props</nu-heading>
          <nu-grid gap="1x 2x" items="center stretch" columns="auto 1fr 4.5">
            <nu-el place="center end">Gap</nu-el>
            <nu-slider
              :value="gap" @input="gap = $event.detail"
              min=".125" max="1" step=".125" type="float"></nu-slider>
            <nu-el>{{ gap }}rem</nu-el>

            <nu-el place="center end">Border</nu-el>
            <nu-slider
              :value="borderWidth" @input="borderWidth = $event.detail"
              min="1" max="4" type="int"></nu-slider>
            <nu-el>{{ borderWidth }}px</nu-el>

            <nu-el place="center end">Radius</nu-el>
            <nu-slider
              :value="radius" @input="radius = $event.detail"
              min="0.0625" max="1.5" step="0.0625" precision="3" type="float"></nu-slider>
            <nu-el>{{ radius }}rem</nu-el>

            <nu-el place="center end">Transition</nu-el>
            <nu-slider
              :value="transitionTime" @input="transitionTime = $event.detail"
              min="10" max="250" step="10" precision="0" type="int"></nu-slider>
            <nu-el>{{ transitionTime }}s</nu-el>
          </nu-grid>
        </nu-card>

        <nu-card>
          <nu-heading level="6" padding="bottom">Scheme</nu-heading>
          <nu-radiogroup
            :value="scheme" @input="scheme = $event.detail"
            display="flex" gap="2x">
            <nu-flex gap items="center">
              <nu-radio value="auto" labelledby=":next"></nu-radio>
              <nu-label>Auto</nu-label>
            </nu-flex>
            <nu-flex gap items="center">
              <nu-radio value="light" labelledby=":next"></nu-radio>
              <nu-label>Light</nu-label>
            </nu-flex>
            <nu-flex gap items="center">
              <nu-radio value="dark" labelledby=":next"></nu-radio>
              <nu-label>Dark</nu-label>
            </nu-flex>
          </nu-radiogroup>
        </nu-card>

        <nu-card>
          <nu-heading level="6" padding="bottom">Contrast</nu-heading>

          <nu-radiogroup
            :value="contrast" @input="contrast = $event.detail"
            display="flex" gap="2x">
            <nu-flex gap items="center">
              <nu-radio value="auto" labelledby=":next"></nu-radio>
              <nu-label>Auto</nu-label>
            </nu-flex>
            <nu-flex gap items="center">
              <nu-radio value="high" labelledby=":next"></nu-radio>
              <nu-label>High</nu-label>
            </nu-flex>
            <nu-flex gap items="center">
              <nu-radio value="normal" labelledby=":next"></nu-radio>
              <nu-label>Normal</nu-label>
            </nu-flex>
          </nu-radiogroup>
        </nu-card>

        <nu-card padding="1x 2x">
          <nu-heading level="6" padding="bottom">Reduce motion</nu-heading>

          <nu-radiogroup
            :value="reducedMotion" @input="reducedMotion = $event.detail"
            display="flex" gap="2x">
            <nu-flex gap items="center">
              <nu-radio value="auto" labelledby=":next"></nu-radio>
              <nu-label>Auto</nu-label>
            </nu-flex>
            <nu-flex gap items="center">
              <nu-radio value="yes" labelledby=":next"></nu-radio>
              <nu-label>Yes</nu-label>
            </nu-flex>
            <nu-flex gap items="center">
              <nu-radio value="no" labelledby=":next"></nu-radio>
              <nu-label>No</nu-label>
            </nu-flex>
          </nu-radiogroup>
        </nu-card>

        <nu-block>
          <nu-btn
            :disabled="!customized"
            special @tap="resetOptions">
            Reset settings
          </nu-btn>
        </nu-block>
      </nu-flex>
    </nu-block>

    <nu-btn
      toggle
      :checked="showSettings"
      @input="toggleSettings($event.detail)"
      special place="fixed right bottom 1" z="front" padding shadow=".5">
      <nu-icon name="sliders"></nu-icon>
    </nu-btn>
  </nu-block>
</template>

<script>
import Lockr from 'lockr';
import Numl from '@/services/numl';
import { helpers } from '../public/numl/index';
import GlobalEvents from './services/global-events';
import Options, { DEFAULT_OPTIONS, setGlobalSettings } from './services/options';
import { GUIDE_MENU } from './menu/guide';
import { FRAMEWORK_MENU } from './menu/framework';
import { STORYBOOK_MENU } from './menu/storybook';
import { REFERENCE_MENU } from './menu/reference';
// import Router from './router/index';

const { resetScroll } = helpers;

function setLinkHeader(item, menu) {
  if (!item) return;

  const index = menu.indexOf(item);

  let heading;

  for (let i = index - 1; i >= 0; i -= 1) {
    const el = menu[i];

    if (el.type === 'heading') {
      heading = el;
      break;
    }
  }

  if (heading) {
    item.heading = heading.label;
  }
}

export default {
  name: 'app',
  data() {
    return {
      version: window.Nude.version,
      numl: Numl,
      showMenu: false,
      showSettings: false,
      ...Options.get(),
      previewChecked: false,
      mounted: false,
    };
  },
  watch: {
    $route() {
      this.showMenu = false;
    },
    scheme(val) {
      setGlobalSettings({ scheme: val });
    },
    contrast(val) {
      setGlobalSettings({ contrast: val });
    },
    showMenu(bool) {
      resetScroll(this.$refs.nav, true);

      if (bool) {
        setTimeout(() => {
          const navItem = document.querySelector('#subnav nu-link[theme="special"]');

          if (navItem) {
            navItem.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 200);
      }
    },
    showSettings() {
      resetScroll(this.$refs.settings, true);
    },
    reducedMotion(val) {
      setGlobalSettings({ reducedMotion: val });
    },
    ...(Object.keys(DEFAULT_OPTIONS)
      .reduce((params, key) => {
        params[key] = function onParamChange(val) {
          Lockr.set(`numl:${key}`, val);

          setGlobalSettings({
            scheme: this.scheme,
            contrast: this.contrast,
            reducedMotion: this.reducedMotion,
          });

          GlobalEvents.$emit('options:change', Options.get());
        };

        return params;
      }, {})),
  },
  mounted() {
    setGlobalSettings();

    // Router.afterEach(() => {
    //   this.showMenu = false;
    //   this.showSettings = false;
    // });

    setTimeout(() => {
      this.mounted = true;
    }, 0);
  },
  methods: {
    toggleMenu(bool) {
      this.showMenu = bool;

      if (bool) {
        this.showSettings = false;
      }
    },
    toggleSettings(bool) {
      this.showSettings = bool;

      if (bool) {
        this.showMenu = false;
      }
    },
    focusContent() {
      this.showMenu = false;
      this.showSettings = false;
    },
    resetOptions() {
      Object.assign(this, DEFAULT_OPTIONS);
    },
    isCurrentSection(section) {
      const current = this.$route.path.match(/[a-z-]+/i) && this.$route.path.match(/[a-z-]+/i)[0];

      return current === section;
    },
  },
  computed: {
    customized() {
      const current = Object.keys(DEFAULT_OPTIONS)
        .reduce((obj, key) => {
          obj[key] = this[key];

          return obj;
        }, {});

      return JSON.stringify(current) !== JSON.stringify(DEFAULT_OPTIONS);
    },
    navLinks() {
      const { path } = this.$route;
      const { subMenu } = this;

      const currentLink = subMenu.find((item) => item.to === path);

      let flag = false;

      const nextLink = subMenu.find((item) => {
        if (item === currentLink) {
          flag = true;
        } else if (flag && item.to) {
          return item;
        }

        return false;
      });

      flag = false;

      const prevLink = [...subMenu].reverse().find((item) => {
        if (item === currentLink) {
          flag = true;
        } else if (flag && item.to) {
          return item;
        }

        return false;
      });

      if (!prevLink && !nextLink) {
        return null;
      }

      setLinkHeader(prevLink, subMenu);
      setLinkHeader(nextLink, subMenu);

      return {
        next: nextLink,
        prev: prevLink,
      };
    },
    subMenu() {
      const { path } = this.$route;

      if (path.startsWith('/reference')) {
        return REFERENCE_MENU;
      }

      if (path.startsWith('/storybook')) {
        return STORYBOOK_MENU;
      }

      if (path.startsWith('/guide')) {
        return GUIDE_MENU;
      }

      if (path.startsWith('/framework')) {
        return FRAMEWORK_MENU;
      }

      return [];
    },
    previewProps() {
      return {
        '--nu-preview-gap': `${this.gap}rem`,
        '--nu-preview-radius': `${this.radius}rem`,
        '--nu-preview-border-width': `${this.borderWidth}px`,
        '--nu-preview-transition': `${this.transitionTime}ms`,
      };
    },
  },
};
</script>
