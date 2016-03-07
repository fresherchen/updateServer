# Update Service API Reference 0.2.0

***

Update Service  API Docs

# 使用说明

本service是基于nodejs+mongodb开发的，以通过调用API的方式对外提供Image版本升级服务；

文档的命名格式:`image_version-buildStart_version-buildEnd.sh`；

目前版本暂不需要通过token验证即可调用，验证部分待后续补充；

设置filePath为虚拟属性，可以通过Schema.filePath获取。

# 主要方法

## File

***

### http://[baseUrl]/files

查看files list

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
image   |  `String`   | image的名称
buildStart | `Number` | 增量升级文件起始version-build
buildEnd |  `Number`  | 增量升级文件目标version-build
updateFile(optional) | `String` | 增量升级文件的名称

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
    "_id": "56d94bef36dd0a6504978b5d",
    "versionStart": "0.1.2",
    "versionEnd": "0.1.8",
    "buildStart": 12,
    "buildEnd": 16,
    "updateFile": "alpine_0.1.2-12_0.1.8-16.sh",
    "hostname": "www.nodechen.com",
    "__v": 0,
    "updatedOn": "2016-03-04T08:45:50.522Z",
    "image": "alpine"
  },
  {
    "_id": "56d94bf436dd0a6504978b5f",
    "versionStart": "0.1.2",
    "versionEnd": "0.1.8",
    "buildStart": 17,
    "buildEnd": 19,
    "updateFile": "alpine_0.1.2-17_0.1.8-19.sh",
    "hostname": "www.nodechen.com",
    "__v": 0,
    "updatedOn": "2016-03-04T08:45:50.522Z",
    "image": "alpine"
  }
]

```

### http://[baseUrl]/files

上传新的update文件

## 文档的命名格式:image_version-buildStart_version-buildEnd.sh

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
file     |  `File`   | update文件

**Request Method**

  `post`

**Returns**

  success: status 200, json type datas
  fail: fail info

**Example**
```
params:

  "file": "centos_0.1.2-12_0.1.8-16.sh"

  ......

results
{
  "__v": 0,
  "versionStart": "0.1.2",
  "versionEnd": "0.1.8",
  "buildStart": 12,
  "buildEnd": 16,
  "updateFile": "centos_0.1.2-12_0.1.8-16.sh",
  "hostname": "www.nodechen.com",
  "_id": "56d950549b620b8804a22ba4",
  "updatedOn": "2016-03-04T09:04:57.065Z",
  "image": "centos"
}

```
### http://[baseUrl]/files/:filename/download

通过文件名获取（下载）文件

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
filename     |  `String`   | update文件名
hostname     |  `String`   | hostname

**Request Method**

  `get`

**Returns**

  success: status 200, file type datas
  fail: fail info

**Example**
```
params:

  ':filename': nodejs_0.1.2-12_0.1.8-16.sh
  hostname: www.nodechen.com

  ......

results

  nodejs_0.1.2-12_0.1.8-16.sh

```

### http://[baseUrl]/files/:fileId

通过fileId获取文件信息

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
:fileId |  `String`  |  文件id

**Request Method**

  `get`

**Returns**

  success: status 200, json type datas
  fail: fail info

**Example**
```
params:

  :fileId 替换为 56d950549b620b8804a22ba4

  ......

results
{
  "_id": "56d950549b620b8804a22ba4",
  "versionStart": "0.1.2",
  "versionEnd": "0.1.8",
  "buildStart": 12,
  "buildEnd": 16,
  "updateFile": "centos_0.1.2-12_0.1.8-16.sh",
  "hostname": "www.nodechen.com",
  "__v": 0,
  "updatedOn": "2016-03-04T09:04:57.065Z",
  "image": "centos"
}

```

### http://[baseUrl]/files/:fileId

通过文件id和文件名修改文件信息

**Parameters**

Param   |  Type     |details
---------|-------------|---------------------
:fileId |  `String`  |  文件id
updateFile  | `String`  |  文件名（格式转换为json）

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
   "updateFile": "alpine_0.1.2-11_0.1.8-12.sh"
}
  ......

results

"currentPath: /data/app/files_update/alpine/alpine_0.1.2-11_0.1.8-12.sh"

```

### http://[baseUrl]/files/:fileId

通过文件id删除文件

**Parameters**

Param   |Type     |details
---------|-------------|---------------------
:fileId |  `String`  |  文件id

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
  "message": "Deleted successfully !!!"
}

```
