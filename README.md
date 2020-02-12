# rename-by-md5

批量使用文件的 `md5` 值给文件重命名

对于没有使用`md5`命名的文件,在文件名后面添加`md5`

对于使用`md5`命名的文件,在文件名后面不重复添加`md5`

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

命令行脚本执行示例

```powershell
node ./cli.js --dir=D:\baidupandownload\
```
