Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('homeTemplate', {path: '/'});
    this.route('loginTemplate', {path: '/login'});
    this.route('registerTemplate', {path: '/register'});
});
