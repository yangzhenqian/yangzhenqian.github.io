# git

## git stash 暂存代码
在已经开发了一部分代码，发现分支存在问题需要回退到之前的版本，此时不想删除已开发的代码并回退到之前的版本

### 暂存常用命令
```md
git stash || git stash -m "暂存说明" || git stash save "暂存说明" //暂存文件
git stash list // 查看暂存列表
git stash pop stash@{0} //恢复暂存列表第一个暂存项，并删除暂存记录
git stash apply stash@{0} //恢复暂存列表第一个暂存项，并保存暂存记录
git stash push text.txt main.js //只缓存部分文件 多个文件用空格分隔
git stash show stash@{0}  //查看某次暂存修改文件
git stash show -p stash@{0} //查看某次暂存所有的文件
```

## git 生命周期钩子函数
- Git钩子是一组脚本，这些脚本对应着Git仓库中的特定事件，每一次事件发生时，钩子会被触发。这允许你可以定制化Git的内部行为，在开发周期中的关键点上触发执行定制化的脚本。

- git钩子分为本地钩子 & 服务端钩子

- 钩子脚本文件通常放置于项目目录的.git/hooks文件夹下。Git会在初始化项目时自动在这个文件夹下放置一些样例脚本。

- 在指定Git仓库中，钩子都是存在于本地的，它们不会跟随git clone命令被复制到新的仓库中去，所以任何对于当前仓库有权限的人都可以对其进行修改。这个特性对于为开发团队配置钩子产生了深远的影响。常用的如在.git存储钩子脚本，clone项目后手动复制到.git下；

- 本地钩子只会影响本地仓库。想必一定会记得每个开发者自己可以修改本地钩子，所以无法将其作为一种提交规范强制执行。不过它们可以让开发者能够更方便地遵循某种规范。
- 已经封装好的git钩子库 husky， line-staged等库
### 本地钩子
脚本放在本地，每位成员都可以随意修改；
#### pre-commit
每一次执行git commit命令时，在要求填入提交信息或者生成提交对象之前，pre-commit脚本会被触发执行；
pre-commit 脚本退出不为0时，会终止提交流程; 可以执行一些eslint校验 || prettier做代码格式化校验；
```js
// 1 为终止流程 0 为校验通过
if ! git diff-index --check --cached $against
then
    echo "pre-commit: Aborting commit due to whitespace errors"
    exit 1
else
    echo "pre-commit: No whitespace errors :)"
    exit 0
fi
```

#### prepare-commit-msg
它会弹出含有提交信息的文本编辑器。在这一步可以用来修改squash或者merge命令自动生成的提交信息。
prepare-commit-msg钩子倒是允许用户在生成提交信息之后再来编辑它。钩子只是一个方便生成提交信息的脚本，不太适合作为强制提交信息规范。

prepare-commit-msg脚本接受的三个参数如下：
1. 储存提交信息的临时文件名称。你可以直接修改这个文件的内容来改变提交信息。
2. 提交类型。可以是message（-m或者-F选项），template（-t选项），merge（如果本次提交时合并提交），或者squash（如果提交squash了其他提交）
3. 关联提交的SHA1哈希值。仅当使用-c, -C, --amend选项时可传。

#### commit-msg
可以传递的唯一参数是存储提交信息的文件名。可以在这一步做提交信息的校验 & 提交信息不符合规范打回等操作；方便做统一提交信息规范的处理；

```js
    // 不是fix开头抛出错误并退出流程
    if content.startswith('fix'):
        print "commit-msg: ERROR! The commit message must start with fix";
        sys.exit(1)
```

#### post-Commit
该脚本不需要传入参数，而且其退出状态码不会影响提交结果。可以通过git log -1 HEAD获取刚刚的提交内容
该脚本可以在commit完成之后进行消息通知，输出信息等操作；

#### post-checkout
每次执行git checkout命令成功检出一个分支或者提交时触发。用于在切换分支时做一些删除混乱文件的操作；
退出状态码对于流程无影响，可以对一些特殊的分支做单独的处理

接收三个参数
1. 当前的HEAD引用
2. 新的HEAD引用
3. 区分本次checkout是针对分支的还是针对文件的。选项值分别为1和0。

#### pre-rebase

git rebase 之前运行的脚本

该钩子接受两个参数：上游分支，和进行rebase的分支。当rebase的分支为当前分支时，第二个参数为空。钩子脚本退出状态码非0时，退出rebase。
```js
// 禁止所有rebase操作
echo "pre-rebase: Rebasing is dangerous. Don't do it."
exit 1
```

### 远程钩子
服务端的钩子与本地钩子类似，只是他们存在于服务端仓库，这些钩子可以通过拒绝某些提交来强制执行提交规范。

#### pre-receive & update

pre-receive 优先于 update执行，都在修改远程仓库前触发，无法控制开发者本地钩子规范，但可以通过该钩子拒绝不合适的提交；还可以做权限校验，判断推送人是否有权限往该分支上推送消息；
pre-receive 与 update不同点，同时触发多个推送，pre-receive只执行一次，而update则执行多次，方便对每条提交进行单独校验；

#### post-receive

提交代码合入主仓库成功后触发，主要用于消息通知，发送邮件，重新编译等操作；