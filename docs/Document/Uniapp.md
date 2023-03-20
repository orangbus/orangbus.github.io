---
title: uniapp 开发笔记
---

# uni-app获取通话记录 自定义基座打包能成功获取

```javascript
// 获取通话记录
				var CallLog = plus.android.importClass("android.provider.CallLog");
				
				var main = plus.android.runtimeMainActivity();
				var obj = main.getContentResolver();
				plus.android.importClass(obj);
				//查询
				var cursor = obj.query(
					CallLog.Calls.CONTENT_URI,
					null,
					null,
					null,
					null
				);
				plus.android.importClass(cursor);
				var content = []; // 用来存储数据
				var count = 0; // 记录多少条
				if (cursor.moveToFirst()) {
					while (cursor.moveToNext()) {
						count++;
						//号码
						var number = cursor.getString(cursor.getColumnIndex(CallLog.Calls.NUMBER));
						//呼叫类型
						var type;
						switch (
							parseInt(cursor.getString(cursor.getColumnIndex(CallLog.Calls.TYPE))))
						// 判断通话类型
						{
							case CallLog.Calls.INCOMING_TYPE:
								type = "呼入";
								break;
							case CallLog.Calls.OUTGOING_TYPE:
								type = "呼出";
								break;
							case CallLog.Calls.MISSED_TYPE:
								type = "未接";
								break;
							default:
								type = "挂断"; //应该是挂断.根据我手机类型判断出的
								break;
						}
						// 获取时间
						var date = new Date(parseInt(
							cursor.getString(cursor.getColumnIndexOrThrow(CallLog.Calls.DATE))));
						// 联系人
						var Name_Col = cursor.getColumnIndexOrThrow(CallLog.Calls.CACHED_NAME);
						var name = cursor.getString(Name_Col);
						// 号码归属地 返回：北京 联通
						var numberLocation = cursor.getString(
							cursor.getColumnIndex(CallLog.Calls.GEOCODED_LOCATION)
						);
						//通话时间,单位:s
						var Duration_Col = cursor.getColumnIndexOrThrow(CallLog.Calls.DURATION);
						var duration = cursor.getString(Duration_Col);
						// 存入数组 
						content.push({
							name: name, // 联系人的姓名
							mobile: number, // 联系人电话
							numberLocation: numberLocation, // 号码的归属地
							callTime: new Date().getTime(date), // 呼入或呼出时间
							talkTime: duration, // 通话时长
							type: type
						});
						// 查询50条 就跳出
						if (count > 50) {
							break;
						}
					}
				}
				console.log(JSON.stringify(content));
```

# 打电话录音功能

```javascript
const recorderManager = uni.getRecorderManager();
```

```javascript
onLoad(option) {
			let self = this;
            recorderManager.onStop(function (res) {
                console.log("res",res)
                self.end_time = Math.round(new Date().getTime() / 1000);
                let voicePath = res.tempFilePath;
                self.voicePath = voicePath;
                self.closeTimeOut();

                uni.showToast({
                    icon: 'loading',
                    title: "请稍后...",
                    duration: 0
                });
                uni.uploadFile({
                    url: self.upload_url,
                    filePath: voicePath,
                    name: "file",
                    formData: {
                        id: self.phoneInfo.id,
                        start_time: self.start_time,
                        end_time: self.end_time,
                        phone: self.phoneNumber
                    },
                    header: {
                        Authorization: "Bearer " + uni.getStorageSync(EnumData.token)
                    },
                    success: (res) => {
                        // console.log("文件上传成功")
                        console.log(res.data);
                    },
                    fail(err) {
                        console.log("文件上传失败")
                        console.log(err);
                    },
                    complete() {
                        self.start_time = 0;
                        self.end_time = 0;
                        uni.hideToast();
                    }
                })
            });
            this.getCallStatus();
}
```

```javascript
getCallStatus() {
    let that = this;
    let maintest = plus.android.runtimeMainActivity();
    let Contexttest = plus.android.importClass("android.content.Context");
    let telephonyManager = plus.android.importClass("android.telephony.TelephonyManager");
    let telManager = plus.android.runtimeMainActivity().getSystemService(Contexttest.TELEPHONY_SERVICE);
    let receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
        onReceive: function (Contexttest, intent) {
            plus.android.importClass(intent);
            let phoneStatus = telManager.getCallState();

            that.callStatus = phoneStatus; //电话状态 0->空闲状态 1->振铃状态 2->通话存在
            switch (phoneStatus) {
                case 0:
                    console.log("3、电话挂断，上传录音")
                    // 结束录音
                    recorderManager.stop();
                    break;
                case 1:
                    // console.log('1、振铃状态');
                    break;
                case 2:
                    console.log('2、通话存在')
                    // 延迟录音
                    that.start_time = Math.round(new Date().getTime() / 1000);
                    recorderManager.start({
                        duration: EnumData.audioDuration, // 时长 10分钟
                        sampleRate: EnumData.audioSampleRate, // 码率
                    });
                    break;
            }
        }
    });

    let IntentFilter = plus.android.importClass('android.content.IntentFilter');
    let filter = new IntentFilter();
    filter.addAction(telephonyManager.ACTION_PHONE_STATE_CHANGED);
    maintest.registerReceiver(receiver, filter);
},
```

