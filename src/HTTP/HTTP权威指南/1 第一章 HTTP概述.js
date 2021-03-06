/**
 *  第一章 HTTP概述
 *      Web浏览器、服务器和相关的Web应用程序都是通过HTTP相互通信的，HTTP是现代全球因特网中使用的公共语言
 *      
 *      HTTP 因特网的多媒体信使     
 *          HTTP可以将遍布全世界的Web服务器上的信息以迅速、便捷、可靠的搬移到人们桌面上的Web浏览器上去
 *          HTTP使用可靠的数据传输协议，能够保证数据在传输过程中不被损坏或者产生混乱。
 *      Web客户端和服务器
 *          Web内容是放在Web服务器上的，Web服务器使用的是HTTP协议，因此经常被称为HTTP服务器
 *          客户端发送HTTP请求，服务器会在HTTP响应中回送所请求的数据
 *          HTTP客户端和HTTP服务器共同构成了万维网的基本组件
 *      资源
 *          Web服务器是Web资源的宿主、Web资源是Web内容的源头，最简单的Web资源就是Web服务器文件系统中的静态文件
 *          文件可以包括任意内容
 *              文本文件 HTML文件 微软的Word文件 Adobe的Acrobat文件 JPEG图片文件 AVI电影文件 
 *          但是资源并非是静态文件。资源还是可以是根据需要生成内容的软件程序。这些动态内容资源可以根据你的身份、所请求的信息或者时间段不同老产生内容
 *          它可以帮助你显示照相机里的照片，也可以帮你进行股票交易，搜索房产数据，或者在线购物
 *          所有类型的内容来源都是资源
 * 
 *          媒体类型（MIME）
 *              MIME是一种文本标记 表示一种主要的对象类型和特定的子类型 中间使用斜杠分隔
 *                  HTML格式的文本文档由text/html类型标记
 *                  普通的ASCII文本文档由text/plain类型标记
 *                  JPEG格式的图片为image/jpeg类型
 *              因特网上有数千种不同的数据类型，HTTP仔细给每种通过Web传输的对象都打上了名为MIME类型的数据格式标签
 *              MIME最初设计是为了解决不同的电子邮件系统之间转移报文时存在的问题 MIME在电子邮件系统中工作的非常好，所以HTTP也采用了它
 *              Web服务器会为所有的HTTP对象数据附加一个MIME类型，当Web浏览器从服务器中取一个对象时，会查看先关的MIME类型，看他是否知道应该如何处理这个对象
 *          URI（统一资源标识符）
 *              统一资源标识符就是服务器资源名，每个服务器资源都有一个名字，这样的客户端就可以说明他们感兴趣的资源是什么了
 *              URI有两种形式
 *                  URL
 *                  URN
 *          URL（统一资源定位符）
 *              URL是资源标识符最常见的形式。URL描述了一台特定服务器上某资源的特定位置。
 *              URL可以明确说明如何从一个精确、固定的位置获取资源。
 *              URL都遵循一种标准格式，这种格式包含三部分
 *                  方案 
 *                      说明了访问资源所使用的协议类型。这部分通常是HTTP协议（http://）
 *                  服务器的因特网地址
 *                      比如 www.joes-hardware.com
 *                  其余部分制定了Web服务器上的某个资源
 *                      比如 /specials/saw-blade.gif
 *          URN（统一资源名）
 *              URN作为特定内容的唯一名称使用的，与目前的资源所在地无关
 *              使用这种与资源位置无关的URN，就可以将资源四处搬移。通过URN还可以用同一个名字通过多种网络访问协议来访问资源
 *              比如 不论因特网标准文档 RFC 2141位于何处，都可以用下列URN来命名它：
 *                  urn:ietf:rfc:2141
 *      事务
 *          一个HTTP事务由一条(从客户端发往服务器的)请求命令和一个（从服务器发回客户端的）响应结果组成
 *          这种通信是通过名为HTTP报文（HTTP message）的格式化数据块进行的
 *          方法
 *              HTTP支持几种不同的请求命令，这些命令被称为HTTP方法（HTTP method）
 *              每条HTTP请求报文都包含一个方法  
 *              这个方法会告诉服务器执行什么操作
 *                  获取一个Web页面
 *                  运行一个网关程序
 *                  删除一个文件
 *              常见的5中方法
 *                  GET         从服务器向客户端发送命名资源
 *                  POST        将客户端数据发送到一个服务器网关应用程序
 *                  DELETE      从服务器上删除一个命名资源
 *                  PUT         将来自客户端的数据存储到一个命名的服务器资源中取
 *                  HEAD        仅发送命名资源响应中的HTTP首部
 *          状态码
 *              每条HTTP响应报文返回时都会携带一个状态码
 *              状态码是一个三位数字的代码 告知客户端请求是否成功，或者是否需要采取其他动作
 *              伴随着状态码，HTTP返回发送一条解释性的'原因短语'文本，用于描述
 *          Web页面中可以包含多个对象
 *              应用程序完成一项任务时通常会发布多个HTTP事务，比如Web浏览器会发布一系列HTTP事务来获取并显示一个包含了丰富图片的Web页面，浏览器会执行一个事务来获取描述页面布局的HTML框架，然后发布另外HTTP事务来获取每个内嵌式图片、图像面板、Java小程序等
 *      报文
 *          HTTP报文是由一行一行简单的字符串组成的 HTTP报文都是纯文本，不是二进制代码
 *          从Web客户端发往Web服务器的HTTP报文称为请求报文，从Web服务器发往Web客户端的HTTP报文称为响应报文 除此之外没有其他形式的HTTP报文
 *          HTTP报文包括以下三个部分
 *              起始行
 *                  报文的第一行就是起始行，在请求报文中用来说明要做些什么，在响应报文中说明出现了什么情况
 *              首部字段
 *                  起始行后面有零个或者多个首部字段。每个首部字段都包含一个名字和值，为了便于解析，两者之间用冒号来分隔。
 *                  首部以一个空行结束
 *                  添加一个首部字段和添加新行一样简单
 *              主体
 *                  空行之后就是主体，其中包含了所有类型的数据。
 *                  请求主体中包括了发送给Web服务器的数据、响应主体中装载了返回给客户端的数据
 *                  起始行和首部字段都是文本形式且都是结构化的，而主体则不同，主体中包含任意的二进制数据（比如图片、视频、音频、软件程序）当然主体中也可以包含文本
 *      连接
 *          报文是如何通过传输控制协议连接从一个地方搬移到另一个地方去的
 *          TCP/IP
 *              HTTP是应用层协议。HTTP无需关心网络通信的具体细节。它把联网的细节都交给了通用、可靠的因特网传输协议TCP/IP
 *              TCP提供了
 *                  无差错的数据传输
 *                  按序传输（数据总是按照发送的顺序到达）
 *                  未分段的数据流（可以在任意时刻以任意尺寸将数据发送过去） 
 *              因特网自身就是基于TCP/IP的，TCP/IP是全世界的计算机和网络设备常用的层次化分组交换网络协议。
 *              TCP/IP隐藏了各种网络和硬件的特点和弱点，使各种类型的计算机和网络都能够进行可靠的通信
 *              只要建立了TCP连接，客户端和服务器之间的报文交换就不会丢失、不会被破坏，也不会在接收时出现错序
 *              HTTP协议位于TCP协议的上层，HTTP使用TCP来传输其报文数据
 *              TCP协议位于IP协议上层
 *          连接、IP地址及端口号
 *              在HTTP客户端向服务器端发送报文之前，需要用网际协议（IP）地址和端口号在客户端和服务器之间建立一条TCP/IP连接
 *              建立一条TCP/IP连接的过程同给公司办公室的某个人打电话过程类似。首先要拨打公司的电话号码，找到正确的机构之后，拨打要联系的那个人的分机号
 *              在TCP中，你需要知道服务器的IP地址，以及服务器上运行的特定软件相关的TCP端口号
 *              HTTP的域名可以通过DNS域名解析系统，转换成对应IP，HTTP的URL中没有使用端口号 默认为80端口
 *              基本的浏览器连接处理
 *                  浏览器从URL中解析出服务器的主机名
 *                  浏览器将服务器的主机名转换成服务器的IP地址
 *                  浏览器将端口号从URL中解析出来
 *                  浏览器建立一条从Web服务器的TCP连接
 *                  浏览器向服务器发送一条HTTP请求报文
 *                  服务器向浏览器返回一条HTTP响应报文
 *                  关闭连接，浏览器显示文档
 *          一个使用Telnet的实例
 *              由于HTTP使用了TCP/IP传输协议，而且它是基于文本的，没有使用那些难以理解的二进制格式，因此很容易直接与Web服务器进行对话
 *              Telnet程序可以将键盘连接到某个目标TCP端口，并将TCP端口的传输回送到显示屏上。Telnet常用于远程终端会话，但它可以连接几乎所有的TCP服务器，包括HTTP服务器
 *              ？？？？下文未完成
 *      协议版本
 *          目前使用的协议版本
 *              HTTP/0.9
 *                  HTTP的1991原型版本被称为HTTP/0.9。这个协议有很严重的设计缺陷，只应该用于与老客户端交互。HTTP/0.9仅支持GET方法，不支持多媒体内容的MIME类型，各种HTTP首部、或者版本号
 *                  HTTP/0.9的设计初衷是为了获取简单的HTML对象
 *              HTTP/1.0
 *                  1.0是第一个得到广泛使用的HTTP版本。1.0版本添加了版本号、各种HTTP首部、一些额外的方法、以及对多媒体对象的处理
 *                  HTTP/1.0使得包含生动图片的Web页面和交互式格式称为可能，而这些页面和表格促使万维网为人们广泛的接收
 *              HTTP/1.0+
 *                  20世纪90年代中叶，很多流行的Web客户端和服务器都飞快的向HTTP中添加各种特性，以满足快速扩张且在商业上十分成功的万维网的需要
 *                  持久的keep-alive连接、虚拟主机支持、以及代理连接支持都被加入到HTTP中，称为了非官方标准。这种非正式的HTTP扩展版通常称为HTTP/1.0+
 *              HTTP/1.1  
 *                  HTTP/1.1重点关注的是矫正HTTP设计中的结构缺陷，明确语义，引入重要的优化措施，并删除一些不好的特性。HTTP/1.1还包含对20世纪90年代末正在发展中的更复杂的Web程序和部署方式的支持
 *                  HTTP/1.1是当前使用的前版本
 *              HTTP-NG
 *                  HTTP-NG是HTTP/1.1后继结构的原型建议，它重点关注的是性能的大幅优化，以及更强大的服务逻辑远程执行框架。HTTP-NG的研究工作止于1998年
 *      Web的结构组件
 *          本章概述中，重点介绍了两个Web应用程序（Web浏览器和Web服务器）是如何发送报文来实现基本事务处理的
 *          在因特网上，要与很多Web应用程序进行交互，本章列出其他比较重要的应用程序如下
 *              代理
 *                  位于客户端和服务器之间的HTTP实体
 *              缓存
 *                  HTTP的仓库，是常用页面的副本可以保存在离客户端更近的地方
 *              网关
 *                  连接其他应用程序的特殊Web服务器
 *              隧道
 *                  对HTTP通信报文进行盲转发的特殊代理
 *              Agent代理
 *                  发起自动进行请求的半智能Web客户端
 *          代理
 *              HTTP代理服务器是Web安全、应用集成以及性能优化的重要组成模块
 *              代理是位于客户端和服务器之间，接收所有客户端的HTTP请求，并将这些请求转发给服务器（可能对请求进行修改之后转发）。对用户来说，这些应用程序就是一个代理，代表用户访问服务器
 *              处于安全考虑，通常代理服务器作为转发所有Web流量的可信任中间节点使用。代理还可以对请求和响应进行过滤。如企业对下载程序进行病毒检测、对小学生屏蔽一些成人看的内容
 *          Web缓存
 *              Web缓存或代理缓存是一种特殊的HTTP代理服务器，可以将经过代理传送的常用文档复制保存起来。下次请求同一文档的客户端就可以享受缓存的私有副本所提供的服务了
 *          网关
 *              网关是一种特殊的服务器，作为其他服务器的中间实体使用（类似于中间转义获取） 
 *              通常用于将HTTP流量转换成其他的协议。网关接收请求时就好像自己是资源的源端服务器一样。客户端并不知道自己正在与一个网关进行通信
 *              例一个HTTP/FTP网关会通过HTTP请求接收对FTP URI的请求，但通过FTP协议获取文档，得到文档后封装成HTTP报文，发送给客户端
 *          隧道
 *              不理解
 *          Agent代理
 *              用户Agent代理是代表用户发起HTTP请求的客户端程序、所有Web请求的应用程序都是HTTP Agent代理。
 *              Agent代理
 *                  Web浏览器
 *                  网络蜘蛛/Web机器人 会自己在Web上闲逛的自动用户Agent代理 可以在无人监视的情况下发布HTTP事务并获取内容
 *                  
 * 
 * 
 *  注意
 *      需要实操一下 发送HTTP请求到服务端 
 *          发送请求报文
 *             起始行 首部字段 主体
 *          
 *                  
 * 
 * 
*/