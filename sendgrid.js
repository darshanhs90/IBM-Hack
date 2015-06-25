var sendgrid  = require('sendgrid')('username', 'password');
sendgrid.send({
  to:       'hsdars@gmail.com',
  from:     'hsdars@gmail.com',
  subject:  'Hello World',
  text:     'My first email through SendGrid.'
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
