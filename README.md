# Update Service API Reference 0.2.1

***

Update Service 运行环境，适用于研发及部署。

本镜像提供：

* update service 0.2.1
* Node.js 4.3.0
* Npm 3.8.7
* Node Packages:
    - grunt

继承关系：update service -->nodejs

# 使用说明

***

**主要文件**

名称 |位置              |说明
--------|--------------------------|-----------------
初始化 | /script/runonce_update.sh   | 只有首次启动执行

### PORTS

请在创建container时指定端口映射，本镜像推荐端口：
端口  | 说明     |推荐
3000| 常见端口  |√

### ENV

无

### VOLUME

container路径  | Host存放位置  | 说明
-------------|--------------|------------------
/data/log | logcenter   | 继承自alpine
/data/persist  |datacenter  | 继承自alphine
/data/app |datacenter  |不建议代码做volume

# 实例

***

### Quickstart

```
file:
  image: reg.leadstec.com/updateservice:latest
  ports:
  	- "41201:3000"
  volumes:
  	- /var/lib/docker/vfs/dir/logcenter/updateservice.localhost:/data/log
  	- /var/lib/docker/vfs/dir/datacenter/updateservice.localhost:/data/persist
  environment:
  	- EMAIL=user@example.com
  	- ENGINE=localhost
  hostname: updateservice.localhost
```

### Link Container

Node.js项目常采用MongoDB，本例子说明如何将nodejs与mongo进行linking。

```
db:
   image:reg.leadstec.com/mongo:latest
   ports:
   	 - "41203:27017"
   	 - "41204:28017"
   volumes:
     - /var/lib/docker/vfs/dir/logcenter/updateservice-db.example.com:/data/log
     - /var/lib/docker/vfs/dir/dbcenter/updateservice-db.example.com:/data/db
     - /var/lib/docker/vfs/dir/datacenter/updateservice-db.example.com:/data/persist
   links:
     - db:db
   environment:
     - EMAIL=user@example.com
   hostname: updateservice.example.com
```


#### Cap

## Usage

## Developing

### Tools

