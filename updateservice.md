# Update Service API Reference 0.1.1

***

Update Service  API Docs

# 使用说明

本servers是基于nodejs+mongodb开发的，以通过调用API的方式对外提供Imag升级数据服务。

文档的命名格式:`image-version_build-version_build.sh`

目前版本暂不需要通过token验证即可调用，验证部分待后续补充。

# 主要方法

## File

***

### http://[baseUrl]/files

查看files list

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
image   |  `string`   | image的名称 
buildStart | `number` | 增量升级文件起始build号
buildEnd |  `number`  | 增量升级文件目标build号
deltaFile(optional) | `string` | 增量升级文件的名称

**Request Method**

  `get`

**Returns**

  success: status 200, json type datas
  fail: fail info
  
**Example**
```
params:

  "name": "alpine",
  "buildStart": "10",
  "buildEnd": "20"
  
  ......
  
results
[
  {
   "_id": "5652c112a131b5550299d971",
   "versionStart": "0.1.2",
   "versionEnd": "0.1.8",
   "buildStart": 12,
   "buildEnd": 16,
   "deltaFile": "apline-0.1.2_12-0.1.8_16.sh",
   "__v": 0,
   "updatedOn": "2015-11-23T07:27:50.964Z",
   "image": "apline"
  },
  {
   "_id": "5652c2b8483ec9a902d83cfe",
   "versionStart": "0.1.2",
   "versionEnd": "0.1.8",
   "buildStart": 17,
   "buildEnd": 19,
   "deltaFile": "apline-0.1.2_17-0.1.8_19.sh",
   "__v": 0,
   "updatedOn": "2015-11-23T07:37:04.591Z",
   "image": "apline"
  }
]

```

### http://[baseUrl]/files

上传新的update文件

## 文档的命名格式:image-version_build-version_build.sh

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
file     |  `file`   | update文件

**Request Method**

  `post`

**Returns**

  success: status 200, json type datas
  fail: fail info
  
**Example**
```
params:

  "file": "apline-0.1.2_12-0.1.8_16.sh"
  
  ......
  
results
{
  "__v": 0,
  "versionStart": "0.1.2",
  "versionEnd": "0.1.8",
  "buildStart": 12,
  "buildEnd": 16,
  "deltaFile": "apline-0.1.2_12-0.1.8_16.sh",
  "_id": "5652c112a131b5550299d971",
  "updatedOn": "2015-11-23T07:27:50.964Z",
  "image": "apline"
}

```
### http://[baseUrl]/files/:filename/download

通过文件名获取（下载）文件

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
filename     |  `string`   | update文件名

**Request Method**

  `get`

**Returns**

  success: status 200, file type datas
  fail: fail info
  
**Example**
```
params:

  ':filename': apline-0.1.2_12-0.1.8_16.sh
  
  ......
  
results

  apline-0.1.2_12-0.1.8_16.sh

```

### http://[baseUrl]/files/:fileId

通过fileId获取文件信息

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
:fileId |  `string`  |  文件id

**Request Method**

  `get`

**Returns**

  success: status 200, json type datas
  fail: fail info
  
**Example**
```
params:

  :fileId 替换为 5652c112a131b5550299d971

  ......

results
{
  "_id": "5652c112a131b5550299d971",
  "versionStart": "0.1.2",
  "versionEnd": "0.1.8",
  "buildStart": 12,
  "buildEnd": 16,
  "deltaFile": "apline-0.1.2_12-0.1.8_16.sh",
  "__v": 0,
  "updatedOn": "2015-11-23T07:27:50.964Z",
  "image": "apline"
}

```

### http://[baseUrl]/files/:fileId

通过文件id和文件名修改文件信息

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
:fileId |  `string`  |  文件id
deltaFile  | `string`  |  文件名（格式转换为json）

**Request Method**

  `post`

**Returns**

  success: status 200, json type datas
  fail: fail info
  
**Example**
```
params:

  :fileId 替换为 563c641753c5cb9e40be907b

{
  "deltaFile":"apline-0.1.2_12-0.1.22_22.sh"
}
  ......

results

"currentPath: /data/file/apline/apline-0.1.2_12-0.1.22_22.sh"

```

### http://[baseUrl]/files/:fileId

通过文件id删除文件

**Parameters**

Param   |Type     |details
---------|-------------|---------------------
:fileId |  `string`  |  文件id

**Request Method**

  `delete`

**Returns**

  success: status 200, json type datas
  fail: fail info
  
**Example**
```
params:

  :fileId 替换为 5652eb758505f8ab08b3c156
  ......

results
{
  "result": "successfully deleted"
}

```
