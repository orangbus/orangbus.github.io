---
title: OpenAI 模型微调
---

环境准备：python11

> https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset

Python包安裝器：https://pip.pypa.io/en/stable/installation/

git命令行工具： https://git-scm.com/downloads

# 1、安装openai脚手架

```bash
pip install --upgrade openai
```

```bash
# 需要的依赖
pip3 install openpyxl
```

配置自己的 api_key （从openai后台获取）

```
export OPENAI_API_KEY="<OPENAI_API_KEY>"
```

# 2、准备训练的数据

prompt.xlsx

| prompt               | completion |
| -------------------- | ---------- |
| 你觉得orangbus怎么样 | 帅，非常帅 |

使用 OpenAI cli 格式化为jsonl的格式数据

```bash
openai tools fine_tunes.prepare_data -f prompt.xlsx
```

```
Based on the analysis we will perform the following actions:
- [Necessary] Your format `XLSX` will be converted to `JSONL`
- [Recommended] Lowercase all your data in column/key `completion` [Y/n]: y
- [Recommended] Add a suffix separator ` ->` to all prompts [Y/n]: n
- [Recommended] Add a suffix ending ` END` to all completions [Y/n]: n
- [Recommended] Add a whitespace character to the beginning of the completion [Y
/n]: n


Your data will be written to a new JSONL file. Proceed [Y/n]: y

Wrote modified file to `openai_data_prepared.jsonl`
Feel free to take a look!

Now use that file when fine-tuning:
> openai api fine_tunes.create -t "openai_data_prepared.jsonl"


Once your model starts training, it'll approximately take 3.13 minutes to train
a `curie` model, and less for `ada` and `babbage`. Queue will approximately take
 half an hour per job ahead of you
```



生成的格式大概是这样的 (每一条数据独占一行)

```json
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
...
```

# 3、创建模型

BASE_MODEL: `ada` ,  `babbage`, ``curie` `davinci` (差别不大，只是价格越高效果越好，哈哈哈)

```bash
openai api fine_tunes.create -t prompt.xlsx -m ada
```

```
Upload progress: 100%|███████████████████| 34.1k/34.1k [00:00<00:00, 17.2Mit/s]
Uploaded file from openai_data_prepared.jsonl: file-aealtK98z24aSt59uJrzsNLj
Created fine-tune: ft-uSw1UeAYzFVbno8QfFE8xHxR
Streaming events until fine-tuning is complete...

(Ctrl-C will interrupt the stream, but not cancel the fine-tune)
[2023-04-25 11:27:42] Created fine-tune: ft-uSw1UeAYzFVbno8QfFE8xHxR
[2023-04-25 11:27:57] Fine-tune costs $0.26
[2023-04-25 11:27:58] Fine-tune enqueued. Queue number: 0
[2023-04-25 11:27:59] Fine-tune started
```

查询预训练模型列表

```
openai api fine_tunes.list
```

```json
{
  "data": [
    {
      "created_at": 1682393262,
      "fine_tuned_model": "curie:ft--2023-04-25-03-29-51", # 这个是你模型的名称
      "hyperparams": {
        "batch_size": 1,
        "learning_rate_multiplier": 0.1,
        "n_epochs": 4,
        "prompt_loss_weight": 0.01
      },
      "id": "ft-xR", // YOUR_FINE_TUNE_JOB_ID
      "model": "curie",
      "object": "fine-tune",
      "organization_id": "",
      "result_files": [
        {
          "bytes": 10355,
          "created_at": 1682393391,
          "filename": "compiled_results.csv",
          "id": "file-puFju0lqFsxybd2WdOXwHcmp",
          "object": "file",
          "purpose": "fine-tune-results",
          "status": "processed",
          "status_details": null
        }
      ],
      "status": "succeeded",
      "training_files": [
        {
          "bytes": 34078,
          "created_at": 1682393261,
          "filename": "openai_data_prepared.jsonl",
          "id": "file-aealzsNLj",
          "object": "file",
          "purpose": "fine-tune",
          "status": "processed",
          "status_details": null
        }
      ],
      "updated_at": 1682393392,
      "validation_files": []
    }
  ],
  "object": "list"
}
```

测试

```
curl https://api.openai.com/v1/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
  "model": "curie:ft--2023-04-25-03-29-51",
  "prompt": " 以2023选择昆明海亦丰中学高考复读怎么样为题，写一篇不低于1000字的文章，要求文章逻辑严谨",
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}'
```





