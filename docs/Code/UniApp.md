---
title: UniApp学习笔记
---

# 自定义导航栏

```vue
```

配置文件

```json
```











# 直接拨号

```javascript
callPhone(phone){
    //#ifdef H5||MP-WEIXIN
    let _this = this;
    uni.makePhoneCall({
        phoneNumber: phone,
        success(){
            // 拨号成功
        },
        fail(){
            uni.showModal({
                content: "拨号失败！"
            })
            return false;
        }
    });
    //#endif

    //#ifdef APP-PLUS
    plus.device.dial(phone,false);
    //#endif
    return true;
},
```



# 获取app的通话记录

```javascript
getCalllog(){
				var CallLog = plus.android.importClass('android.provider.CallLog');
				var Activity = plus.android.runtimeMainActivity();
				var ContentResolver = plus.android.importClass('android.content.ContentResolver');
				var resolver = Activity.getContentResolver();
				plus.android.importClass(resolver);
				var String = plus.android.importClass("java.lang.String");
				var cs = resolver.query(CallLog.Calls.CONTENT_URI, null, null, null, CallLog.Calls.DEFAULT_SORT_ORDER);
				var talist = [];
				uni.showLoading({
					title: "匹配通话记录中.."
				});
				var count = 0; // 记录多少条 用于处理循环跳出
				while (plus.android.invoke(cs, "moveToNext")) {
					count++;
					talist.push({
						xm: plus.android.invoke(cs, "getString", plus.android.invoke(cs, "getColumnIndex", CallLog.Calls.CACHED_NAME)),
						telphone: plus.android.invoke(cs, "getString", plus.android.invoke(cs, "getColumnIndex", CallLog.Calls.NUMBER)),
						duration: plus.android.invoke(cs, "getString", plus.android.invoke(cs, "getColumnIndex", CallLog.Calls.DURATION)),
						date: plus.android.invoke(cs, "getString", plus.android.invoke(cs, "getColumnIndex", CallLog.Calls.DATE)),
						type: plus.android.invoke(cs, "getString", plus.android.invoke(cs, "getColumnIndex", CallLog.Calls.TYPE))
					});
					if(count > 50){
						break;
					}
				}
				uni.hideLoading();
				console.info("talist",talist);
			},
```

```
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

