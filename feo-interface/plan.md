#FEO项目规划

##数据库设计                             

###用户
- role
- username
- nickname
- password
- createTime
- createBy 

###配置文件
- projectName
- createTime
- createBy
- lastOptimizeTime
- lastOptimizeBy
- isOptimizing
- isShow

##功能设计
- 优化:执行bat文件,将控制台中的执行结果发送到网页
- 查询:按照用户输入,查询相关条目**(管理员用户,可以通过输入'%delete%'来显示所有标记删除的条目)**
- 显示全部:显示数据库中所有相关条目
- 新增项目:添加优化项目,不可重名
- 删除:标记删除**(管理员用户,可以通过输入'%delete%'来显示所有标记删除的条目,再点击删除,代表物理删除)**
- 配置:修改的项目优化所需的相关资源
- 恢复:管理员用户可恢复标记删除的项目
- 配置权限:该页面只对管理员开放,可在当页通过弹出框方式,重新设置某账户的权限
- 删除用户:物理删除该用户
- 重置密码:直接将该用户密码重置为00000000


