# rename-by-md5

批量使用文件的 md5 值给文件重命名

对于没有使用`md5`命名的文件,在文件名后面添加`md5`

```js
[
  "D:\\baidupandownload\\qqqqqqqq.webp",
  "D:\\baidupandownload\\qqqqqqqq-d41d8cd98f00b204e9800998ecf8427e.webp"
];
```

对于使用`md5`命名的文件,在文件名后面不重复添加`md5`

```js
[
  "D:\\baidupandownload\\qqqqqqqq-d41d8cd98f00b204e9800998ecf8427e.webp",
  "D:\\baidupandownload\\qqqqqqqq-d41d8cd98f00b204e9800998ecf8427e.webp"
];
```

运行脚本

```
yarn run start
```
