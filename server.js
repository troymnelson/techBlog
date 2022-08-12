const express = require('express');
const PORT = process.env.PORT || 3333
const { engine } = require('express-handlebars');
require('dotenv').config();
const path = require('path');
const connection = require('./model/conn')
const app = express();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const view_routes = require('./routes/view_routes');
const post_routes = require('./post_routes');
const auth_routes = require('./auth_routes');

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: false}));


app.use(session({
    secret: process.env.SESSION_SECRET,

    store: new SequelizeStore({ db: connection }),

    saveUninitialized: false,

    resave: false,

    cookie: {
        // httpOnly: true
    }

}))

app.use('/', view_routes);
app.use('/auth', auth_routes);
app.use('/post', post_routes);


connection.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        })
})

