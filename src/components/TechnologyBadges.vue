<template>
  <div>
    <ul class="icons">
      <li class="icons__item" v-for="technology in getTechnologyInfos()"><object class="icons__icon" v-bind:data="`/src/res/tech-icons/${technology.filename}.svg`" type="image/svg+xml"></object></li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  type TechnologyInfo = {
    name: string,
    filename: string
  }

  const technologiesNameMap: { [key:string]:string; } = {
    "OpenCV": "opencv",
    "c++": "cpp",
    "hardware-interfacing": "hwint",
    "TypeScript": "ts",
    "Webpack": "webpack"
  }

  @Component({
    props: ['technologies']
  })
  export default class TechnologyBadges extends Vue {
    constructor() {
      super();
    }

    getTechnologyInfos(): Array<TechnologyInfo> {
      return (this as any).technologies.map((t: any) => {
        return {
          name: t, 
          filename: technologiesNameMap[t]
        };
      });
    }
  }
</script>

<style lang="scss" scoped>
  .icons {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .icons__item {
    height: 50px;
    width: 50px;
    background-color: hsl(120, 80, 35);
    margin-right: 5px;
  }

  .icons__icon {
    height: 50px;
    width: 50px;
  }
</style>
