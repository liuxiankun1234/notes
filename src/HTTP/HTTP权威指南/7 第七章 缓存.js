/**
 *  疑问
 *      一个网址，有1万个人访问 这个时候会是什么情况啊
 * 
 * 第七章 缓存
 *  
 *  为什么会用到缓存这个东西呢？或者说缓存有什么好处
 *      缓存减少了冗余的数据传输
 *      缓存缓解了网络瓶颈的问题，不需要更多的带宽就能更快地加载页面
 *      缓存降低了对原始服务器的要求，服务器可以更快地响应，避免过载的出现
 *      缓存降低了距离延时，因为从较远的地方加载页面会更慢一些
 *  
 *  冗余的数据传输
 *      很多客户端访问同一个流行的原始服务器页面时，服务器会多次传输同一份文档，每次传输给一个客户端。一些相同的
 *      字节会在网络中一遍遍的传输。这些冗余的数据会耗尽昂贵的带宽，降低传输速度，加重Web服务器的负载。
 *      有了缓存就可以保留第一条服务器响应的副本，后续请求就可以由缓存的副本来应对了，这样可以减少那些流入/流出原始
 *      服务器的、被浪费掉的重复流量
 *  带宽瓶颈
 *      缓存还可以缓解网络的瓶颈问题
 *      很多网络为本地网络客户端提供的带宽比为远程服务器提供的带宽要宽，客户端会以路径上最慢的网速访问服务器。
 *      如果客户端从一个快速局域网的缓存中得到一份副本，那么缓存就可以提高性能 尤其是传输比较大的文件时
 *  瞬间拥塞
 *      缓存在破坏瞬间拥塞时显得非常重要。
 *      突发事件使得很多人几乎同时访问一个Web文档时，就会出现瞬间拥塞。由此造成的过多流量峰值可能会使网络和Web服务器产生灾难性的崩溃
 *  距离时延
 *      即使带宽不是问题，距离也可能成为问题。每台网络路由器都会增加因特网流量的时延，即使客户端和服务器之间没有太多的路由器，光速本身也会造成
 *      显著的时延。
 *      波士顿到旧金山直线距离是2700英里，最好的情况下，以光速传（186000英里/秒）播的信号可以在15毫秒内从波士顿到达旧金山，并在30毫秒完成一个往返
 *      假设某个Web页面中包含了20个小图片，都在旧金山的一台服务器上。如果波士顿的一个客户端打开4条到服务器并行连接，而且保持着连接的活跃状态，光速自身就要消耗
 *      大约1/4秒的下载事件
 *      将缓存放在附件的机房可以将文件传输距离从数千英里缩短为数十米
 *  命中与未命中
 *      缓存命中
 *          可以用已经有的副本为某些到达缓存的请求提供服务
 *      缓存未命中
 *          其他一些到达缓存的请求可能由于没有副本可用，而被转发给原始服务器
 *      再验证(新鲜度检测)
 *          原始服务的内容可能会发生变化，缓存要不时的对其进行检测，看看它们保存的副本是否仍是服务器上最新的副本，这些新鲜度检测被称为HTTP再验证
 *          为了有效的进行再验证，HTTP定义了一些特殊的请求，不用从服务器上获取整个对象，就可以快速检测出内容是否是最新的
 *          缓存可以在任意时刻，以任意的频率对副本进行再验证。不过缓存中通常包括数百万的文档，而且网络带宽很珍贵，所以大部分缓存只在客户端发起请求，并且副本旧到足以需要验证的时候，才对副本进行再验证
 *              再验证命中（缓慢命中）
 *                  缓存对缓存的副本进行再验证时，会向原始服务器发送一个小的再验证请求。如果内容没有发生变化，服务器会以一个小的304 Not Modified进行响应，并将副本提供给客户端
 *                  比单纯的缓存命中要慢，但是再验证命中没有从服务器中获取对象数据，所以比缓存未命中要快
 *              再验证未命中
 *                  服务器端与缓存的副本不同，服务器向客户端发送一条普通的、带有完整内容的HTTP 200 OK响应
 *              对象被删除 
 *                  如果服务器对象已经被删除，服务器就会发送一个404 Not Found响应，缓存也将其副本删除
 *  命中率（缓存命中比率）
 *      ？？？？？？？？？？
 *  缓存的拓扑结构
 *      ？？？？？？？？？？       
 *  缓存的处理步骤
 *      商业化代理缓存相当复杂。除了一些微妙的细节之外，Web缓存的基本工作原理大多很简单
 *      一条HTTP get请求的基本缓存处理过程包括7个步骤
 *          接收
 *              缓存从网络中读取抵达的请求报文
 *              高性能缓存会同时从多条输入连接上读取数据，在整条报文抵达之前开始对事务进行处理
 *          解析
 *              缓存对报文进行解析，提取URL和各种首部字段
 *              缓存将请求报文解析成片段，将首部的各个部分放入易于操作的数据结构中。
 *          查询
 *              缓存查询是否有本地副本可用，如果没有，就获取一份副本（并将其保存在本地）
 *              缓存获取了URL，查找本地副本。本地副本可能存储在内存、本地磁盘，甚至附件的另一台计算机中。专业级的缓存会使用算法来快速确定本地缓存中是否有某个对象。如果没有这个文档，他可以根据情形和配置，到原始服务器或父代理中取，或者返回一些错误信息
 *              已缓存对象中包含了服务器响应主体和原始服务器响应首部，这样就会在缓存命中之后返回正确的服务器首部。已缓存对象中还包括了一些元数据，用来标记对象在缓存中停留了多久，以及他被用过多少次
 *          新鲜度检测
 *              缓存查看已缓存的副本是否足够新鲜，如果不是，就询问服务器是否有任何更新
 *          创建响应
 *              缓存会用新的首部和已缓存的主体来构建一条响应报文
 *              我们希望缓存的响应看起来像来自服务器的一样，缓存将已缓存的服务器响应首部作为响应首部的起点，然后缓存对这些基础首部进行了修改和扩充
 *              缓存负责对这些首部进行改造，以便与客户端的要求相匹配
 *                  比如客户端期待一条HTTP/1.1响应，但是服务器返回的可能是1.0版本，这种情况，缓存必须对首部进行响应的转换
 *                  缓存还会向其中插入新鲜度信息（cache-Control,Age以及Expires首部），而且通常会包含一个Via首部来说明请求是一个代理缓存提供的
 *          发送
 *              缓存通过网路将响应传递给客户端
 *          日志
 *              缓存可选的创建一个日志文件描述这个事务
 *  保持副本的新鲜
 *      服务器资源的变化频率不同，财经数据可能每几秒就会变化、报纸每天变化、报告可能几个月发生变化，如果缓存提供的总是老的数据，就变的毫无用处
 *      已缓存的副本要与服务器一致
 *      文档过期（服务器再验证）
 *          Cache-Control首部和Expires首部，HTTP让原始服务器向每一个文档附加一个'过期日期'，这些首部时间表示多长时间内可以将这些内容视为新鲜的
 *          在缓存过期之前，缓存可以任意频率使用这些副本，而无需与服务器进行验证（除非客户端含有阻止提供已缓存或未验证资源的首部）
 *          一旦缓存副本过期，缓存就必须与服务器进行核对，询问文档是否被修改，如果修改过，服务器会传送过来一份新鲜（带有新的过期时间）的副本
 *      过期日期和使用期（强缓存）
 *          服务器用HTTP/1.0+的Expires首部和HTTP/1.1的Cache-Control:max-age响应首部来指定过期日期，同时还会带有响应主体。
 *          优先使用Cache-Control:max-age
 *          Expires首部
 *              使用的是绝对时间，依赖于计算机时钟的正确设置
 *              如果日期已经过了，说明文档不再新鲜
 *          Cache-Control:max-age首部
 *              使用的是相对时间
 *              max-age定义了文档的最大使用期-从第一次生成文档到文档不再新鲜、无法使用为止，最大的合法生存时间
 *              单位是秒（S）
 *      服务器再验证
 *          缓存过期仅意味着要进行核对的事件了，并不能说明副本与服务器上处于活跃状态的文档有实际的区别
 *          再验证显示内容发生变化
 *              缓存会获取一份新的文档副本，并将其储存在旧文档位置上，然后将文档发送给客户端
 *          再验证显示内容未发生变化
 *              缓存只需获取新的首部，包括一个新的过期日期，并对缓存中的首部进行更新，然后将文档发送给客户端
 *          HTTP协议要求正确的缓存返回的内容如下
 *              '足够新鲜'的已缓存副本
 *              与服务器进行过再验证，确认其仍然是新鲜的已缓存副本
 *              如果需要与之进行再验证的服务器出现故障，返回一条错误报文
 *              附有警告信息说明内容可能不正确的已缓存副本
 *      用条件方法进行再验证
 *          HTTP条件方法可以高效的实现再验证
 *              HTTP允许缓存向原始服务器发送一个‘条件get’,请求服务器只有在文档与缓存中现有的副本不同时，才回送主体对象。
 *              通过这种方式，将新鲜度检测和对象获取结合成一个单个的GET请求。向get请求报文中添加一些特殊的条件首部，就可以发起条件GET，只有条件为真时服务器才会返回对象
 *          HTTP定义了5个条件请求首部
 *              缓存再验证最有用的2个首部
 *                  If-Modified-Since
 *                  If-None-Match
 *      If-Modified-Since：Date再验证(简写IMS)
 *          自指定日期之后，文档被修改了，If-Modified-Since条件就为真，通常GET就会成功执行，携带新首部的新文档会被返回给缓存，新首部除了其他信息外，还包含了一个新的过期日期
 *          自指定日期之后，文档未被修改，条件为假，会向客户端返回一个小的304 Not Modified响应报文，为了提高有效性，不会返回文档的主体。这些首部是放在响应中返回的，但只会返回那些需要在源端更新的首部
 *              比如通常COntent-Type首部通常不会被修改，所以通常不需要发送、一般会发送一个新的过期日期
 *          IMS首部可以与Last-Modified服务器响应首部配合工作。原始服务器会将最后的修改日期附加到所提供的文档上。当缓存要对已缓存文档进行再验证时，就会包含一个IMS首部，其中携带有最后修改已缓存副本的日期            
 *              If-Modified-Since: <cached last modified date>
 *          注意
 *              有些web服务器并没有将IMS作为真正的日期进行比对，而是进行字符串化处理进行对比
 *          流程
 *              客户端第一次请求服务为其，服务器会将副本的最后修改时间通过响应头返回给客户端（中间商缓存服务器），客户端再次请求服务器时，如果响应头中有Last-Modified字段，浏览器就会在请求头中加IMS字段给服务器
 *      If-None-Match：实体标签再验证
 *          有些情况仅使用最后修改日期进行再验证是不够的
 *              有些文档可能会被周期性重写（比如，从一个后台进程中写入），但实际包含的数据常常是一样的。尽管内容没有变化，但修改日期会发生变化
 *              有些文档可能被修改了，但是修改并不重要，不需要让世界范围的缓存都重装数据（比如对拼写或者注释修改）
 *              有些服务器无法准确的判断页面最后修改日期
 *              有些服务器提供的文档会在亚秒间隙内发生变化（实时监控器），对这些服务器来说，以一秒为粒度的修改日期可能不够用了
 *          实体标签是附加到文档上的任意标签（引用字符串）。他们可能包含了文档的序列号或版本号，或者是文档内容的校验和其他指纹信息
 *          当发布者对文档进行修改时，可以修改文档的实体标签来说明这个新的版本。这样如果实体标签被修改了，缓存就可以用If-None-Match条件首部来GET文档新的副本了
 *      强弱验证器
 *          实体标签和最后修改时间都是缓存验证器
 *          有时，服务器希望在对文档进行一些非实质性或不重要的修改时，不要让所有的已缓存的副本都失效，HTTP/1.1支持'弱验证器',如果只对内容进行了少量修改，就允许服务器声明那是'足够好'的等价体
 *          只要内容发生变化，强验证器就会变化。弱验证器运训对一些内容进行修改，但内容的主要含义发生变化时，通常它还是变化的。有些操作不能用弱验证器来实现（比如有条件的获取部分内容），所以通常服务器会用前缀'W/'来标识弱验证器
 *          不管相关的实体值以何种方式发生变化，强实体标签都要发生变化。而相关实体在语义上发生了比较重要的变化时，弱实体标签也应该发生变化
 *          注意
 *              原始服务器不能为两个不同的实体重用一个特定的强实体标签值，或者为两个语义不同的实体重用一个特定的弱实体标签值。缓存条目都可能会留存任意长的时间，与过期时间无关，
 *              有人可能希望缓存验证条目时，决不能再次使用在过去某一时刻获得的验证器，这种愿望可能不太实现
 *      什么时候应该使用实体标签和最近修改日期
 *          如果服务器回传了一个实体标签，HTTP/1.1客户端就必须使用实体标签验证器。
 *          如果服务端回传了一个Last-Modified值，客户端就可以使用IMS验证
 *          如果实体标签和Last-Modified都提供了，客户端就应该使用这两种再验证方法，这样HTTP/1.1和HTTP/1.0缓存就都可以正确响应了     
 *          
 *          除非HTTP/1.1原始服务器无法生成实体标签验证器，否则就应该发送一个出去，如果使用弱实体标签有优势的话，发送的可能就是一个弱实体标签，而不是强实体标签。而且最好发送一个最近修改事件
 *          如果HTTP/1.1缓存或服务器收到的请求既带有IF-Modified-Since，右带有实体标签条件首部，那么只有这两个条件都满足，才能返回304 Not Modified响应
 *  控制缓存的能力          
 *      服务器可以通过HTTP定义的几种方式来指定在文档过期之前可以将其缓存多长时间。
 *      按照优先级递减的顺序，服务器可以
 *          附加一个Cache-Control:no-store首部到响应中去
 *          附加一个Cache-Control:no-cache首部到响应中去
 *          附加一个Cache-Control:must-revalidate首部到响应中去
 *          附加一个Cache-Control:max-age首部到响应中去
 *          附加一个Expires日期首部到响应中去
 *          不附加过期日期，让缓存确定自己的过期日期
 *      no-store与no-cache响应首部
 *          HTTP/1.1提供几种限制提供已缓存对象的方式，以维持对象的新鲜度。
 *          no-store和no-cache可以防止缓存提供未经证实的已缓存对象
 *          no-store
 *              响应会禁止缓存对响应进行复制。缓存通常会像非缓存代理服务器一样，向客户端转发一条no-store响应，然后删除对象
 *          no-cache
 *              no-cache标识的响应可以存储在本地缓存区中，只是在与原始服务器进行新鲜度验证之前，不能提供给客户端
 *          Pragma: no-cache
 *              HTTP/1.1中提供Pragma: no-cache首部是为了兼容于HTTP/1.0+。除了与只理解Pragma: no-cache的HTTP/1.0应用程序进行交互时，HTTP/1.1应用程序都应该使用Cache-Control:no-cache
 *      max-age首部响应
 *          max-age首部响应表示从服务器将文档传来之时，可以认为此文档处于新鲜状态的秒数
 *          还有一个s-maxage首部，其行为与max-age类似，但仅适用于共享（共有）缓存
 *          服务器可以请求缓存不要缓存文档，或者将最大使用期设置为零，从而在每次访问时候都进行刷新
 *      Expires响应首部
 *          不推荐使用Expires响应首部
 *          有些服务器会回传一个Expires：0响应首部，试图将文档置于永远过期的状态，但是这种语法是错误的，可能会给软件带来问题。应该试着支持这种结构的输入，但不应该产生这种结构的输出
 *      must-revalidate响应首部
 *                        
 *          
 * 
 * 
 * 
 *  问题
 *      IF-None-Match实体标签验证 
 *          由服务端发起的吗？发起的标志是什么 中间商怎么能知道是不是要用实体标签来做缓存校验
 *          同Last-Modified吗？
 *      HTTP/1.1和HTTP/1.0缓存还不一样吗
 *      客户端怎么强制不接受缓存或者选择缓存类型呢？
 *      服务端即设置了 Cache-Control:no-store或者Cache-Control:no-cache又设置了 Expires Cache-control: max-age怎么处理呢 
*/      