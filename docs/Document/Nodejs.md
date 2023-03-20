---
title: nodejs 学习笔记
---



```javascript
<template>
  <v-container class="fill-height">
    <v-responsive class="">
      <v-list>
        <v-list-item
        v-for="(item,index) in m3u8List"
        :key="index"
        >
          <v-list-item-title>
            <div>duration: {{ item.duration}}</div>
            <div>uri: {{ item.uri}}</div>
            <div>key: {{ item.key}}</div>
          </v-list-item-title>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-responsive>
  </v-container>
</template>

<script>
import axios from "axios";
import {Parser} from "m3u8-parser";

export default {
  name: "index",
  data() {
    return {
      url: "https://v.gsuus.com/play/NbWQx1We/index.m3u8",
      downloadList:[],
      m3u8List:[],

    }
  },
  mounted() {
    this.getData()
  },
  methods:{
    getData(){
      axios.get(this.url).then(res=>{
        let {status,data} = res;
        if (status === 200){
          this.m3u8List = this.parseUrl(data);
          console.log(this.m3u8List)
        }
      });
    },

    /**
     * 解析 m3u8 列表
     * @param m3u8Data
     */
    parseUrl(m3u8Data){
      let parser = new Parser();
      parser.push(m3u8Data);
      parser.end();
      return  parser.manifest.segments;
    },

    /**
     * 下载
     */
    download(){

    },

    /**
     * 合并
     */
    mergeFile(){

    }
  }
}
</script>

<style scoped>

</style>

```

