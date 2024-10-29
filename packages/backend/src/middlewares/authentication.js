const basicAuthUsername = process.env.BASIC_AUTH_USERNAME;
const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;

function checkAuthorization(req, res, next) {
  const handleUserNotAuthorized = () => {
    const err = new Error('Unauthorized');

    res.status(401).set('WWW-Authenticate', 'Basic');
    next(err);
  };

  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return handleUserNotAuthorized();
  }

  const encodedCredentials = authorizationHeader.split(' ')[1];
  const [username, password] = Buffer.from(encodedCredentials, 'base64').toString().split(':');

  if (username !== basicAuthUsername || password !== basicAuthPassword) {
    return handleUserNotAuthorized();
  }

  res.status(200);
  next();
}

module.exports = checkAuthorization;
