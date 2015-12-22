# gulp-template-replace

**gulp插件**，我在开发ng应用的时候，开发环境下经常使用到**templateUrl**，但是我在发布后不想引用模版了，所以写了这一个插件把模版代码读取出来并替换上去。

## 下载安装

```sh
$ npm install gulp-template-replace
```

## 文档说明


```javascript
gulp.src('...')
        .pipe(replace([
            {
                "rule": "替换规则，可以是字符串也可以是正则",
                "file": "模版文件地址，或读取出来并且压缩",
                "fileRead": function (text) {
                    //fileRead 可写也不写
                    //如果没有写 会直接把文件内的代码替换上去
                    //如果写了 会把转换后的代码传递来经过再一次处理 再替换
                    return "template: " + text;
                }
            },
            {
                "rule": "替换规则，可以是字符串也可以是正则",
                "text": "替换字符，这也是普通的替换和replace没区别"
            }
        ]))
        .pipe(gulp.dest('...'));
```