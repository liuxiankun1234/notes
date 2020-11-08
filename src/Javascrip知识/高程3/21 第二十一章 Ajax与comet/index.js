/**
 *  Ajax与Comet
 *      XMLHttpRequest
 *          var xhr = new XMLHttpRequest();
 *          XHR的用法
 *              xhr.open(type, url, sync)
 *                  type    请求的类型 get post等
 *                  url     请求的URL
 *                  sync    是否异步发送请求
 *                  调用open方法并不会发出一个请求，而只是启动一个请求以备发送
 *                  只能向同一个域中使用相同的端口和协议的URL发送请求，否则会引发安全错误
 *              xhr.send(data)
 *                  send方法调用后，请求会被分派到服务器
 *                  data参数
 *                      请求主体发送的数据 如果不需要通过请求主体发送数据，则必须传入null
 *              readyState
 *                  表示请求、响应过程的当前活动阶段
 *                  0   未初始化 尚未调用open()方法
 *                  1   启动    已经调用open()方法，但尚未调用send()方法
 *                  2   发送    已经调用send()方法，但尚未接收到响应
 *                  3   接收    已经接收到部分的响应数据
 *                  4   完成    接收全部数据，可以在客户端使用
 *              readystatechange事件
 *                  readyState属性的值有一个值变为另一个值都会触发一次readystatechange事件，可以通过此事件检测状态变化后的readyState状态
 *              收到响应后，响应的数据会自动填充XHR对象的属性，相关的属性简介如下
 *                  responseText
 *                      作为响应主体被返回的文本
 *                  responseXML
 *                      如果响应的内容是'text/xml'或者'application/xml'，这个属性中将保存包含着响应数据的XML DOM文档
 *                  status
 *                      响应的HTTP状态
 *                  statusText
 *                      HTTP状态的说明
 *              xhr.abort()
 *                  未收到响应之前可以通过abort方法停止触发事件，不再允许访问与响应有关的对象属性
 *                  终止请求后应该解绑XHR对象的应用操作
 *                  内存原因不建议重用xhr对象
 *          HTTP头部信息
 *              每个HTTP请求和响应都会带有相应的头部信息
 *              XHR对象也提供了操作这两种头部分信息的方法
 *              默认情况发送XHR请求的同时，还会发送下列头部信息
 *                  Accept:             浏览器能够处理的内容类型
 *                  Accept-Charset:     浏览器能够显示的字符集
 *                  Accept-Encoding:    浏览器能够处理的压缩编码
 *                  Accept-Language:    浏览器当前设置的语言
 *                  Connection:         浏览器与服务器之间连接的类型
 *                  Cookie:             当前页面设置的任何Cookie
 *                  Host:               发送请求的页面所在的域
 *                  Referer:            发送请求的URI HTTP规范的这个头部字段拼写错了 只能将错就错(referrer)
 *                  User-Agent:         浏览器的用户代理字符串
 *              setRequestHeader(name, value)
 *                  可以设置自定义的请求头部信息
 *                  触发时机 只能在调用open()方法之后，send()方法之前
 *                  name 头部字段名
 *                  value 头部字段的值
 *              getAllResponseHeaders()
 *                  返回非自定义多行文本内容
 *          GET请求
 *              常用于向服务器查询信息
 *              将查询字符串参数追加到URL的末尾，以便将信息发送给服务器        
 *              查询参数的名值必须使用encodeURIComponent()进行编码
 *          POST请求
 *              向服务器发送应该被保存的数据
 *              通过send方法传递发送的请求主体
 *      XMLHttpRequest2级
 *          FormData
 *              优点不需要明确的在XHR对象上设置请求头部 xhr对象能够自动识别数据类型是FormData实例 配置适当的头部信息
 *              var data = new FormData();
 *              data.append('name', 'lxk')；
 *              append方法参数为字段名和字段包含的值     
 *          超时设定
 *              xhr.timeout = 1000;
 *              xhr.addEventListener('timeout', function() {  })
 *              请求在1s内没有返回，则自动终止 会调用timeout处理程序
 *          overrideMimeType()方法
 *              重写xhr响应的MIME类型
 *              overrideMimeType方法必须在send()方法之前调用才能重写响应的类型
 *          进度事件
 *              每个请求都从触发loadstart事件开始，接下来是一个或者多个progress事件，然后触发error、abort、load事件中的一个，最后触发loadend事件
 *              loadstart
 *              progress
 *                  在接收响应期间持续不断的触发
 *                  必须在open之前注册该事件处理程序
 *                  接收一个event参数
 *                      target              当前的xhr对象
 *                      position            已接收到字节数         
 *                      totalSize           根据Content-Length响应头部确定的字节数
 *                      lengthComputable    进度信息是否可用的布尔值
 *              error
 *              abort
 *              load
 *                  在接收到完成的响应数据时触发
 *                  只要浏览器接收到服务器的响应，不管状态如何都会触发load事件 意味着需要检查status属性才能确定数据是否真的可用
 *              loadend
 *      跨域资源共享
 *          XHR实现主要限制是 跨域安全策略
 *          默认情况下 XHR对象只能访问与包含它的页面位于同一个域中的资源
 *          注意 跨域请求和响应不包含cookie信息
 *          CORS(Cross-Origin-Resource-Sharing 跨域资源共享) 
 *              定义了必须访问跨域资源时，浏览器与服务器间应该如何沟通
 *              浏览器端设置Origin 域名、端口、协议
 *              服务端设置Access-Control-Allow-Origin头部回发相同的源信息
 *          Preflighted Requests
 *              CORS通过一种叫做 Preflighted Requests的透明服务器验证机制支持开发人员使用自定义的头部、get或post之外的方法，以及不同类型的主体内容
 *              
 *          带凭据的请求
 *              默认情况跨域请求 不提供凭据（cookie HTTP认证及客户端SSL证明等）
 *              withCredentials 设置为true 可以指定某个请求应该发凭据
 *              服务器接收凭据的请求会用HTTP头部响应
 *                  Access-Control-Allow-Credentials: true
 *              如果发送的是带凭据的请求，但服务器响应中没有包含这个头部，那么浏览器就不会把响应交给JS(于是，responseText中将是空字符串，status值为0，调用onerror事件处理程序)
 *      其他跨域技术
 *          图像Ping(可以做布点)
 *              使用<img/>标签     
 *              动态创建图像经常用于图像Ping 服务器会检验传递图片的真实性 传一个1*1的图片就可以
 *              优点
 *                  可以跨域 
 *                  不需要使用xhr对象
 *             缺点
 *                  只能GET请求
 *                  无法访问服务器的响应文本
 *          JSONP（JSON with padding）
 *              两部分组成
 *                  回调函数
 *                      响应回来时应该在页面中调用的函数
 *                      这个是怎么自动调用的呢？？？？？？？？？？
 *                  数据
 *                      传递给服务器的数据
 *              通过动态创建<script>元素来使用的
 *              仅支持get请求
 *              数据通过params传递
 *              
 *              
 *              
*/