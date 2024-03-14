1. Http protocol
    - Tạo một package.json bằng cách npm init, index.js
    npm i express
    - Tại thẻ index.js nạp chương trình vào => chạy http://localhost:3000
    Xem ở trên trang expressjs để biết thêm chi tiết
2. Nodemon
    - Sử dụng với mục đích ko cần chạy lại files, nó sẽ following theo files (tự động khởi động lại ứng dụng node khi phát hiện các thay đổi tệp trong thư mục)
    npm i --save-dev nodemon
    - Trong thẻ scripts của package.json tạo "start": "nodemon index.js" => dùng để khởi chạy bằng cách npm start
    "start": "nodemon --inspect index.js" ta sử dụng --ispect để debug
3. Morgan
    - Dùng để ghi nhật kí yêu cầu của HTTP
    npm i morgan --save-dev
    - Thêm vào file index.js
        const morgan = require('morgan')
        app.use(morgan('combined'))
4. Template engine(handlebars)
    - Mục là viết mã HTML ở file ở nơi khác gọn hơn rồi export về file chính. Hiện tại mình không sử dụng được module fs.
    npm i express-handlebars
    - Tạo folder src chứa:
        a. index.js và đi sửa ở file package.json thành src/index.js
        b. Thêm const handlebars  = require('express-handlebars').engine
        c. app.engine('handlebars', handlebars()) => app sử dụng template engine là handlebars vs tên là handlebars và sử dụng thư viện handlebars
            app.set('view engine', 'handlebars') => sử dụng handlebars, đặt view engine là handlebars
        d. Trong src tạo folder là resources chứa scss và view
            Trong views chứa home.hbs và layouts
            Trong layout chứa main.hbs
        e. Thêm app.set('views', path.join(__dirname, 'resources/views')) Cái này mình vẫn chưa hiểu
        f. Sửa lỗi Error: ENOENT: no such file or directory, open           'D:\Workspace\nodejs\Blog\src\resources\views\layouts\main.handlebars'
            Ta đi thêm vào nội dung của main.hbs
        g. ta thêm đường dẫn news và thêm file news.hbs vào để khi truy vấn vào đường link http://localhost:3000/news sẽ render đc
        h. Đi sửa đuôi của handlebars thành hbs
            app.engine('hbs', handlebars({
                extname: '.hbs'
            }))
        i. Tách header và footer ra 2 file khác
            - Nó nằm ở folder partials
        l. Giải thích code
            app.engine('hbs', handlebars({
                extname: '.hbs'
            }))
                -Một phương thức để đăng ký một template engine (máy chủ mẫu) với ứng dụng Express là handlebars
            app.set('view engine', 'hbs')
                -Thiết lập các giá trị cấu hình cho ứng dụng,  Handlebars sẽ được sử dụng làm template engine cho ứng dụng.
            app.set('views', path.join(__dirname, 'resources/views'))
                -Tạo ra đường dẫn, thiết lập thư mục chứa tệp mẫu
            - Template engine (đôi khi được gọi là view engine) là một công cụ cho phép bạn tạo các trang HTML động dựa trên các dữ liệu được truyền vào từ ứng dụng web của bạn. Thay vì tạo các trang HTML tĩnh và lặp đi lặp lại các đoạn mã HTML, bạn có thể sử dụng template engine để tạo các mẫu có thể tái sử dụng, được lập trình động và linh hoạt.
5. Static file & SCSS
    a. Thêm ảnh vào thư mục public/img/logo.png
        - Thêm vào file index.js: app.use(express.static(path.join(__dirname, 'public')))
            - Giải thích express.static(): express.static() là một middleware được tích hợp sẵn trong Express để phục vụ các tệp tĩnh như HTML, CSS, JavaScript và hình ảnh. Middleware này cho phép bạn chỉ định một thư mục nơi các tệp tĩnh sẽ được phục vụ cho các yêu cầu HTTP. Middleware là một phần mềm đóng vai trò như một lớp trung gian giữa các yêu cầu (request) và phản hồi (response) trong quá trình xử lý một ứng dụng web. Middleware có thể xử lý các yêu cầu, sửa đổi các phản hồi hoặc đơn giản là chuyển tiếp các yêu cầu tới middleware hoặc route tiếp theo trong chuỗi middleware. Trong ứng dụng Express, middleware được xác định bằng cách sử dụng phương thức use() hoặc các phương thức tương tự get(), post(), put() và delete() để định nghĩa các middleware cho các route cụ thể. Middleware được thực thi tuần tự theo thứ tự được định nghĩa trong ứng dụng.
            - Thêm các file trong thư mục public. Khi nhận được một yêu cầu HTTP để truy cập tệp tĩnh, middleware này sẽ tìm kiếm tệp tương ứng trong thư mục public và gửi phản hồi HTTP chứa tệp đó cho client.
            - Khi nhận đường dẫn từ client: img/logo.png thì kiểm tra vs file tĩnh có trong folder public.
    b. npm install --save-dev sass
        - Thêm vào scripts "watch": "sass --watch src/resources/scss/app.scss src/public/css/app.css".
        - SCSS cho phép bạn sử dụng các tính năng không có trong CSS truyền thống, chẳng hạn như biến, lồng trong, phạm vi và các hàm toán học, giúp cho việc viết CSS dễ dàng hơn và có thể tái sử dụng được nhiều lần. SCSS sử dụng cú pháp tương tự như CSS, với một số cú pháp mới được bổ sung vào để hỗ trợ các tính năng mới.
        - Node-sass là một thư viện cung cấp liên kết cho Node.js với LibSass, phiên bản C của bộ tiền xử lý biểu định kiểu phổ biến, Sass. Nó cho phép bạn biên dịch các tệp .scss thành css với tốc độ đáng kinh ngạc và tự động thông qua một phần mềm trung gian kết nối.
        - Thêm folder scss vào resources, css vào public
    c. Cấu hình cho sass truyền dữ liệu qua css (biên dịch sass qua css)
        scripts: "watch": "sass --watch src/resources/scss/app.scss src/public/css/app.css", --watch khi ta thay đổi bên scss thì css sẽ thay đổi theo mà ta ko cần chạy cú pháp lại.
        Sử dụng lệnh npm run watch
    d. Thêm vào thẻ html là đường dẫn /css/app.css ở file main.hbs
        - Ta có thể thêm vào scss _variables để lưu những định dạng cố định: @import 'variables';
6. USE bootstrap
    a. <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    b. Thêm dữ liệu của header.hbs vào
7. Basic routing
    - Định tuyến các yêu cầu từ client tới các middleware xử lý. Định tuyến đề cập đến việc xác định cách ứng dụng phản hồi yêu cầu của máy khách tới một điểm cuối cụ thể, đó là một URI (hoặc đường dẫn) và một phương thức yêu cầu HTTP cụ thể (GET, POST, v.v.). Để định nghĩa route cho các phương thức này, ta có thể sử dụng các phương thức tương ứng của đối tượng app, ví dụ app.post(), app.put(),...
    - Định nghĩa các tuyến đường và truy cập vào nó
    - req: chứa các thông tin mà ứng dụng gửi lên server
    - res: setup trả về ntn
    Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: [Object: null prototype] {},
        pathname: '/',
        path: '/',
        href: '/'
    }
8. GET METHOD
9. Query parameters
    - Query parameters là một chuỗi truy vấn được client gửi lên server. Server sẽ nhận các thông tin này để xử lý và trả về một kết quả phù hợp với truy vấn được gửi lên.
    - Các chuỗi truy vấn có thể được đính kèm trong một URL. Trong URL, các truy vấn sẽ bắt đầu từ sau dấu ? , mỗi truy vấn là một cặp {key:value}, các cặp ngăn cách nhau bởi kí tự & tạo thành một object gọi là param và được gửi lên server. 
        Ví dụ: http://example.com/users?name=viblo&age=20 
            {
                name: "viblo",
                age: "20"
            }
    a. Thêm app.get('/search', (req, res) => {
                res.render('search')
            })
    b. Thêm search.hbs trong folder views và đưa dữ liệu vào
10. Default behavior of HTML forms
    Đi định dạng ở search trong file scss
    Ta có thể sử dụng phương thức POST thay cho get
        a. Thay get ở trong index.js và search.hbs(thẻ form: method)
    - Đi thay đổi hành vi mặc định của form
        form: action="": submit ở đâu(url nào) ở request URL
            method: submit vs method nào
        Vậy nên ở bài này ta thêm ở action="/news": news ở đây là nơi ta muốn nhận
        - Thuộc tính action trong form: thuộc tính để thiết lập URL sẽ nhận dữ liệu, là địa chỉ mà dữ liệu của form gửi đến (submit đến, post đến). Thiếu tham số này thì action bằng URL đang truy cập (tức gửi thông tin form đến server theo địa chỉ đang truy cập). Web server nhận được dữ liệu, xử lý và trả về nội dung nào đó.(URL Chỉ định nơi gửi dữ liệu biểu mẫu khi biểu mẫu được gửi). Được sử dụng để chỉ định đường dẫn tới tập tin xử lý dữ liệu khi biểu mẫu được gửi đi.
        - Thuộc tính method trong form: thuộc tính để thiết lập HTTP Method, xem thêm HTTP Request Message thường có giá trị bằng get hoặc post. Nếu không viết thuộc tính này thì method mặc định của form là get
11. POST method
    Gửi dữ liệu từ client lên server.
    - Trong Express, để gửi phản hồi (response) từ máy chủ (server) tới trình duyệt (browser) của khách hàng (client), chúng ta sử dụng phương thức "send()" của đối tượng response. Phương thức "send()" được sử dụng để gửi dữ liệu văn bản, HTML, JSON hoặc bất kỳ kiểu dữ liệu nào khác từ máy chủ đến trình duyệt của khách hàng.
    - Đối vs method GET thì khi submit nó sẽ đính query parameters lên URL
    - Đối vs method POST ẩn trên URL - FORM DATA
    a. Thêm vào index.js 
        app.post('/search', (req, res) => {
            res.send()
        })
    b. Sửa search.hbs method là POST và action trống
        - Trong Express, "req.body" là một thuộc tính của đối tượng "request" được sử dụng để lấy dữ liệu gửi đến từ trình duyệt của khách hàng thông qua phương thức POST hoặc PUT. Thuộc tính "req.body" sẽ chứa các thông tin mà khách hàng đã gửi đến server trong phần thân của yêu cầu.
        - Thêm middleware

