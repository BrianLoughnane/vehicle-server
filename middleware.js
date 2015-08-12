var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    // expressSession = require('express-session'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // ===========================
  // Sessions
  // ===========================
  
  // // session token
  // var session = { path: '/',
  //   httpOnly: true,
  //   secure: false,
  //   secret: 'carlypsoamazing',
  //   cookie: {maxAge: 60000, secure: false},
  //   maxAge: 60000,
  //   resave: false,
  //   saveUninitialized: true
  // };

  // app.use(expressSession(session));

  // var userRouter = express.Router();
  // var incidentRouter = express.Router();
  // var messageRouter = express.Router();

  

  // ===========================
  // Parse Request
  // ===========================

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // ===========================
  // Assign Request to Router
  // ===========================

  var router = express.Router();

  app.use('/', router);

  // app.use('/api/users', userRouter); // use user router for all user request
  // app.use('/api/incidents', incidentRouter); // user link router for link request
  // app.use('/api/messages', messageRouter);

  // ===========================
  // Error Handling
  // ===========================

  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);


  // inject our routers into their respective route files
  require('./router.js')(router);
};
