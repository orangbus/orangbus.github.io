![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7758243f96a4af4a964ee3df1e5e66a~tplv-k3u1fbpfcp-watermark.image) 

简介
--

什么是MeiliSearch?

MeiliSearch是用Rust实现的开源搜索引擎，在很多功能上和elasticsearch相似，应用场景就是业务搜索，虽然也能存储日志和检索数据，但没有elasticsearch方便和强大

**特点**

*   搜索即体验（返回结果 < 50 毫秒）
*   全文检索
*   错别字容忍（理解错别字和拼写错误）
*   搜索和过滤器
*   支持汉字（汉字）
*   支持同义词
*   易于安装、部署和维护
*   支持返回整个文档
*   高度可定制
*   RESTful API

官网传送门: [docs.meilisearch.com/](https://link.juejin.cn?target=https%3A%2F%2Fdocs.meilisearch.com%2F "https://docs.meilisearch.com/")

安装
--

使用官方推荐的docker方式一键安装,如果只想做实验，不持久数据，可将-v等参数删除

该服务大概在10秒后启动完成，启动快，易于部署

```
docker run -p 7700:7700 -v "$(pwd)/data.ms:/data.ms" getmeili/meilisearch
复制代码
```

下载示例数据：

按照官网提示操作下载: [github.com/meilisearch…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmeilisearch%2FMeiliSearch%23create-an-index-and-upload-some-documents "https://github.com/meilisearch/MeiliSearch#create-an-index-and-upload-some-documents")

**导入示例数据**

```
curl -i -X POST 'http://127.0.0.1:7700/indexes/movies/documents' \
  --header 'content-type: application/json' \
  --data-binary @movies.json
复制代码
```

### UI

完成上面步骤后，打开[http://ip:7700](https://link.juejin.cn?target=http%3A%2F%2Fip%3A7700 "http://ip:7700") 访问MeiliSearch UI，该UI默认为开启，如果在生产环境建议关闭，避免数据安全问题

以下为演示搜索GIF图，可见搜索非常快 ---图片来源于官网 ![trumen-fast.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/753237e2f4f34b64a0da6f84f097a732~tplv-k3u1fbpfcp-watermark.image)

使用
--

请求方式elasticsearch一样支持http方式，也支持各种SDK

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c9ee849fe77495592d483ea13bd815b~tplv-k3u1fbpfcp-watermark.image)

### curl方式

直接使用curl命令请求地址+路径参数，就可以返回数据，管道符 | 后面的jq 是linux下的json格式化工具，需另行安装

```
curl 'http://127.0.0.1:7700/indexes/movies/search?q=botman+robin&limit=2' | jq
复制代码
```

### web界面

官方还另外提供了一个开源web项目，用于交互测试和使用MeiliSearch(纯js写的，咋就不是基于vue的了✨)，可以说服务真周到

传送门: [github.com/meilisearch…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmeilisearch%2Fmini-dashboard "https://github.com/meilisearch/mini-dashboard")

虽说有工具可以直接用，但要集成到业务还是要写代码的，下面基于Go SDK演示一些示例

API例子
-----

MeiliSearch的api，可以分为五大类

*   索引操作
*   文档操作
*   搜索操作
*   设置管理
*   系统管理

其中`文档操作`里面包括了索引操作，在操作文档里如果 索引不存在会自动创建等

系统和设置类属于 索引的配置项管理和运维部分

### 初始化

简化后续的代码冗余，这里设置客户端为全局

因为启动服务没有设置apikey，这里有空，如想设置，例子: export MEILI_MASTER_KEY=xxx

```
var (
   client *meilisearch.Client
   err error
)

func init() {
   client = meilisearch.NewClient(meilisearch.ClientConfig{
      Host:    "http://ip:7700",
      APIKey:  "",
      Timeout: 0,
   })
}
复制代码
```

### 索引操作

索引操作，api直接提供了语义化的 方法。调用执行既可，包括创建，查看，和删除等

```
func indexOperation()  {
   idx := "fruits"
   //创建索引
   index, _ := client.CreateIndex(&meilisearch.IndexConfig{
      Uid:        idx,
      PrimaryKey: idx + "_id",
   })
   fmt.Println(index.UID)

   //获取索引
   index2, _ := client.GetIndex(idx)
   fmt.Println(index2)

   //删除索引
   ok, _ := client.DeleteIndex(idx)
   fmt.Println(ok)

   //列出所有索引
   indexes, _ := client.GetAllIndexes()
   fmt.Println(indexes)
}
复制代码
```

### 文档操作

前面使用curl导入了 一批官方提供的数据，这里根据这些数据 来实例文档类的api

其中值得注意的是 增加文档和更新文档的操作。。

*   增加文档:

如果索引不存在，自动创建。如果文档不存将创建新的文档，如果文档存在，整个文档将被覆盖，且先前文档中不在于新文档的 字段将被删除

*   更新文档

如果索引不存在，自动创建。该更新只会更新旧文档的部分内容，旧的文档不存在于新文档的字段都会保留

```
func documentsOperation() {

   indexName := "movies"

   //获取一个文档
   var a interface{}
   client.Index(indexName).GetDocument("25684", &a)
   fmt.Println(a)

   //获取所有文档
   var b interface{}
   request := meilisearch.DocumentsRequest{Limit:2}
   client.Index(indexName).GetDocuments(&request,&b)
   fmt.Println(b)

   //增加文档
   documents := []map[string]interface{}{
      {
         "id":           287949,
         "title":        "Shazam",
         "poster":       "https://image.tmdb.org/t/p/w1280/xnopI5Xtky18MPhK40cZAGAOVeV.jpg",
         "overview":     "A boy is given the ability to become an adult superhero in times of need with a single magic word.",
         "release_date": "2019-03-23",
      },
   }
   addDocuments, _ := client.Index(indexName).AddDocuments(documents)
   fmt.Println(addDocuments.UpdateID)

   //更新文档
   documents2 := []map[string]interface{}{
      {
         "id":     287947,
         "title":  "Shazam ⚡️",
         "genres": "comedy",
      },
   }
   updateDocuments2, _ := client.Index(indexName).UpdateDocuments(documents2)
   fmt.Println(updateDocuments2.UpdateID)

   //删除一个文档
   document, _ := client.Index(indexName).DeleteDocument("25684")
   fmt.Println(document.UpdateID)

   //批量删除
   client.Index("movies").DeleteDocuments([]string{"23488", "153738", "437035", "363869",})

   //删除所有文档
   client.Index("movies").DeleteAllDocuments()
}
复制代码
```

### 搜索操作

一但数据写进去，大部分的操作就是查数据了，搜索的api就一个Search

Search接收一个结构体SearchRequest的数据，该结构体支持10种条件(过滤，高亮，限制，长度，跳过等等)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfb2348ac5404e579853389636407eeb~tplv-k3u1fbpfcp-watermark.image)

```
func searchOperation() {

   //限制返回结果为10条
   request := &meilisearch.SearchRequest{
      Limit: 10,
   }
   search, err := client.Index("movies").Search("Harry Potter", request)
   if err != nil {
      log.Println("查询错误: ",err)
   }
   fmt.Println(search.Hits)
   
   //高亮显示
   //过滤book_id 大于10的
   request2 := &meilisearch.SearchRequest{
      AttributesToHighlight: []string{"*"},
      Filters: "book_id > 10",
   }
   search2, _ := client.Index("movies").Search("prince", request2)
   fmt.Println(search2.Hits)
}
复制代码
```

### 设置管理

设置管理是针对索引的配置项，针对单个索引，也可以全局所有索引

其中配置项为: 同义词，停用词，排行规则，过滤属性，独特属性，搜索属性，显示属性

以下示例中演示了，查看，设置，重置配置项的方法

```
func settingsManager() {
   //查看索引全部配置项
   settings, _ := client.Index("movies").GetSettings()
   fmt.Printf("%#v",settings)

   //更新索引全部配置项
   distinctAttribute := "movies"
   settingsData := meilisearch.Settings{
      RankingRules: []string{
         "words",
         "typo",
         "proximity",
         "attribute",
         "exactness",
         "desc(release_date)",
         "desc(rank)",
      },
      DistinctAttribute: &distinctAttribute,
      SearchableAttributes: []string{
         "title",
         "description",
         "genre",
      },
      DisplayedAttributes: []string{
         "title",
         "description",
         "genre",
         "release_date",
      },
      StopWords: []string{
         "the",
         "a",
         "an",
      },
      Synonyms: map[string][]string{
         "wolverine": []string{"xmen", "logan"},
         "logan":     []string{"wolverine"},
      },
   }
   updateSettings, _ := client.Index("movies").UpdateSettings(&settingsData)
   fmt.Println(updateSettings.UpdateID)

   //重置索引全部配置项
   resetSettings, _ := client.Index("movies").ResetSettings()
   fmt.Println(resetSettings)

   //查看索引停用词
   words, _ := client.Index("movies").GetStopWords()
   fmt.Println(words)

   //更新索引停用词
   stopWords := []string{"of","the","to"}
   updateStopWords, _ := client.Index("movies").UpdateStopWords(&stopWords)
   fmt.Println(updateStopWords.UpdateID)

   //重置索引停用词
   resetStopWords, _ := client.Index("movies").ResetStopWords()
   fmt.Println(resetStopWords.UpdateID)

   //查看索引排名规则
   rules, _ := client.Index("movies").GetRankingRules()
   fmt.Println(rules)

   //更新索引排名规则
   rankingRules := []string{
      "words",
      "typo",
      "proximity",
      "attribute",
      "exactness",
      "asc(release_date)",
      "desc(rank)",
   }
   updateRankingRules, _ := client.Index("movies").UpdateRankingRules(&rankingRules)
   fmt.Println(updateRankingRules.UpdateID)

   //重置索引排名规则
   resetRankingRules, _ := client.Index("movies").ResetRankingRules()
   fmt.Println(resetRankingRules.UpdateID)

   //过滤属性  暂未实现

   //查看索引独特属性
   attribute, _ := client.Index("movies").GetDistinctAttribute()
   fmt.Println(attribute)

   //更新索引独特属性
   updateDistinctAttribute, _ := client.Index("movies").UpdateDistinctAttribute("movie_id")
   fmt.Println(updateDistinctAttribute.UpdateID)

   //重置索引独特属性
   resetDistinctAttribute, _ := client.Index("movies").ResetDistinctAttribute()
   fmt.Println(resetDistinctAttribute.UpdateID)

   //查看索引搜索属性
   attributes, _ := client.Index("movies").GetSearchableAttributes()
   fmt.Println(attributes)

   //更新索引搜索属性
   searchableAttributes := []string{
      "title",
      "description",
      "genre",
   }
   updateSearchableAttributes, _ := client.Index("movies").UpdateSearchableAttributes(&searchableAttributes)
   fmt.Println(updateSearchableAttributes.UpdateID)

   //重置索引搜索属性
   resetSearchableAttributes, _ := client.Index("movies").ResetSearchableAttributes()
   fmt.Println(resetSearchableAttributes.UpdateID)

   //查看索引显示属性
   displayedAttributes, _ := client.Index("movies").GetDisplayedAttributes()
   fmt.Println(displayedAttributes)

   //更新索引显示属性
   displayedAttributesData := []string{
      "title",
      "description",
      "genre",
      "release_date",
   }
   updateDisplayedAttributes, _ := client.Index("movies").UpdateDisplayedAttributes(&displayedAttributesData)
   fmt.Println(updateDisplayedAttributes.UpdateID)

   //重置索引显示属性
   resetDisplayedAttributes, _ := client.Index("movies").ResetDisplayedAttributes()
   fmt.Println(resetDisplayedAttributes.UpdateID)

}
复制代码
```

### 系统管理

该部分api，主要是围绕着运维相关的事宜，任务状态，健康检测，数据备份等

```
func systemManager() {
   //获取更新状态
   status, _ := client.Index("movies").GetUpdateStatus(1)
   fmt.Println(status)

   //获取全部更新状态
   updateStatus, _ := client.Index("movies").GetAllUpdateStatus()
   fmt.Println(updateStatus)

   //获取索引的统计信息
   stats, _ := client.Index("movies").GetStats()
   fmt.Println(stats)

   //获取全部索引的统计信息
   allStats, _ := client.GetAllStats()
   fmt.Println(allStats)

   //检查实例健康状况
   health, _ := client.Health()
   fmt.Println(health.Status)

   //要看实例版本信息
   version, _ := client.GetVersion()
   fmt.Println(version.BuildDate,version.PkgVersion)

   //创建备份
   respDump, _ := client.CreateDump()
   fmt.Println(respDump.Status)

   //查看备份状态
   respDumpStatus, _ := client.GetDumpStatus(respDump.UID)
   fmt.Println(respDumpStatus)
}
复制代码
```

总结
--

MeiliSearch测试下来，在小业务量搜索方面，确实做到 部署快，启动快，搜索快等特点(没有大业务量环境)，在搜索场景下又多了一个选择

api方便语义化非常好，使用方便简洁，执行的动作对应一个方法，非常的照顾小白了

感觉可以集成到 管理后台搜索，小程序搜索，博客搜索，内部资源搜索等场景中

当然千言万语还不如自已实际使用一下，感觉一下，下一代搜索引擎MeiliSearch