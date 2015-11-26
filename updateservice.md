# Update Service API Reference 0.1.1

***

Update Service  API Docs

# 使用说明

本servers是基于nodejs+mongodb开发的，以通过调用API的方式对外提供Image升级数据服务。

文档的命名格式:`image_version-build_version-build.sh`

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
buildStart | `number` | 增量升级文件起始version-build
buildEnd |  `number`  | 增量升级文件目标version-build
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
  "buildStart": "1.1.0-10",
  "buildEnd": "1.2.5-20"
  
  ......
  
results
[
  {
    "_id": "565677d017767c8417063a6f",
    "versionStart": "1.0",
    "versionEnd": "1.0",
    "buildStart": 1,
    "buildEnd": 2,
    "deltaFile": "alpine_1.0-1_1.0-2.sh",
    "domainName": "192.168.2.102:41439",
    "__v": 0,
    "updatedOn": "2015-11-26T03:08:51.437Z",
    "image": "alpine",
    "filePath": "192.168.2.102:41439/files/alpine_1.0-1_1.0-2.sh/download"
  },
  {
    "_id": "5656648402258a9814988341",
    "versionStart": "0.1.2",
    "versionEnd": "0.1.8",
    "buildStart": 12,
    "buildEnd": 16,
    "deltaFile": "alpine_0.1.2-12_0.1.8-16.sh",
    "domainName": "192.168.2.102:41439",
    "__v": 0,
    "updatedOn": "2015-11-26T01:41:07.212Z",
    "image": "alpine",
    "filePath": "192.168.2.102:41439/files/alpine_0.1.2-12_0.1.8-16.sh/download"
  }
]

```

### http://[baseUrl]/files

上传新的update文件

## 文档的命名格式:image_version-build_version-build.sh

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

  "file": "nodejs_0.1.2-12_0.1.8-16.sh"
  
  ......
  
results
{
  "__v": 0,
  "versionStart": "0.1.2",
  "versionEnd": "0.1.8",
  "buildStart": 12,
  "buildEnd": 16,
  "deltaFile": "nodejs_0.1.2-12_0.1.8-16.sh",
  "domainName": "192.168.2.102:41439",
  "_id": "5656aea1690bc094259da3ca",
  "updatedOn": "2015-11-26T07:02:31.509Z",
  "image": "nodejs",
  "filePath": "192.168.2.102:41439/files/nodejs_0.1.2-12_0.1.8-16.sh/download"
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

  ':filename': nodejs_0.1.2-12_0.1.8-16.sh
  
  ......
  
results

  nodejs_0.1.2-12_0.1.8-16.sh

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

  :fileId 替换为 565677d017767c8417063a6f

  ......

results
{
  "_id": "565677d017767c8417063a6f",
  "versionStart": "1.0",
  "versionEnd": "1.0",
  "buildStart": 1,
  "buildEnd": 2,
  "deltaFile": "alpine_1.0-1_1.0-2.sh",
  "domainName": "192.168.2.102:41439",
  "__v": 0,
  "updatedOn": "2015-11-26T03:08:51.437Z",
  "image": "alpine",
  "filePath": "192.168.2.102:41439/files/alpine_1.0-1_1.0-2.sh/download"
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

  :fileId 替换为 565677d017767c8417063a6f

{
   "deltaFile": "alpine_0.1.2-11_0.1.8-12.sh"
}
  ......

results

"currentPath: /data/file/alpine/alpine_0.1.2-11_0.1.8-12.sh"

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

  :fileId 替换为 565677d017767c8417063a6f
  ......

results
{
  "message": "successfully deleted"
}

```
