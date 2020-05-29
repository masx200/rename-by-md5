# rename-by-md5

批量使用文件的 `md5` 值给文件重命名

对于没有使用`md5`命名的文件,在文件名后面添加`md5`

对于使用`md5`命名的文件,在文件名后面不重复添加`md5`

# 安装方法

```shell
npm i -g @masx200/rename-by-md5
```

安装依赖

```
yarn install
```

编译脚本

```
yarn build
```

运行脚本

```
yarn  start
```

# 配置参数

在"rename-config.json"文件中配置参数

递归查找输入文件夹`dir`的

指定后缀名`extention`的文件

配置参数中的`keeporigin`代表是否保留原文件名

```ts
interface RENAMECONFIG {
    extention: string[];
    dir: string;
    keeporigin: boolean;
}
```

# 命令行参数

必须参数 dir:类型 string ,指定文件夹目录

可选参数 extention:类型 string ,指定文件扩展名

# 命令行脚本执行示例

```powershell
node ./cli.js "--dir=D:\baidupandownload\"
```

使用方法

```shell
npx @masx200/rename-by-md5  "--dir=C:\Example Files"
```

```shell
npx @masx200/rename-by-md5  "--dir=C:\Example Files" --extention=jpg
```
