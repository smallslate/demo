/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , quiz = require('./routes/quiz') 
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

var app = express();
app.set('env', 'development');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());  
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'innovation' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	  app.set('serverURL', 'http://localhost:3000/');
});

app.configure('production', function() {
	    app.set('serverURL', 'http://quizzes.elasticbeanstalk.com/');
});

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: app.get('serverURL')+'auth/google/return',
    realm: app.get('serverURL')
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      if(profile) {
    	  routes.findOrCreate(profile.emails[0].value,profile.name.givenName,profile.name.familyName,function(err,result){
    		  if(err) {
    			  profile.identifier = null;
    	          return done(null, null);
    		  } else {
    			  profile.identifier = identifier;
    			  profile.myUserId =result.userId;
                  return done(null, profile);
    		  }
    	  });
      }	else {
    	  profile.identifier = null;
          return done(null, null);
      }
    });
  }
));
app.locals.basedir = 'views';

app.all('*', routes.setIsAuthenticated);
app.all('/user/*',routes.authenticateUser);
app.all('/admin/*',routes.authenticateAdmin);


app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/user/myprofile', routes.myProfile);

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', [passport.authenticate('google', { failureRedirect: '/login' }),routes.setIsAuthenticated], routes.myProfile);

app.get('/admin/createCategory', quiz.createCategory);
app.post('/admin/crudCategory', quiz.crudCategory);
app.get('/getAllCategories', quiz.getAllCategories);

app.get('/admin/createSubCategory', quiz.createSubCategory);
app.get('/getSubCategoriesByCategoryId', quiz.getSubCategoriesByCategoryId);

app.get('/user/createExam', quiz.createExam);
app.get('/user/myExams', quiz.myExams);
app.get('/user/myExamList', quiz.myExamList);
app.get('/user/getExamDetailsForEdit', quiz.getExamDetailsForEdit);

app.post('/user/crudQuizDetails', quiz.crudQuizDetails);

app.post('/user/crudQuestionDetails', quiz.crudQuestionDetails);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
