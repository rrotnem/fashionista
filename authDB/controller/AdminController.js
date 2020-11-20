const AdminUser = require('../model/AdminModel')
const env = require('../DB')
const jwt = require('jsonwebtoken')

exports.adminLogin = function (req, res) {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }
  AdminUser.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }

    if (!user) {
      console.log("this is" + user);
      return res.status(422).json({ 'error': "Invalid User" })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'Wrong email or password' })
    }
  })
}

exports.adminRegister = function (req, res) {
  const { username, email, password, passwordConfirmation } = req.body
  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  AdminUser.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new AdminUser({
        username, email, password
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
}




exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  const user = jwt.verify(json_token, env.secret)
  console.log(user)
  try {
    if (user) { 
      AdminUser.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Not authorized user' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Not authorized user' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err,
       error: 'Oops, Please check with your admin.' 
    })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], env.secret)
}

exports.GetAllUsers = (req, res) => {
  AdminUser.find({}, (err, data) => {
    if (err) throw err;
    res.json(data);
  })
}

exports.DeleteUserById = (req, res) => {
  var id = req.params.id;
  AdminUser.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }
    console.log("this is" + result);

    if (result.deletedCount > 0) {
      res.json({ "msg": "Record delete Successfully" })
    } else {
      res.json({ "msg": "Record doesn't exist" })
    }
  })

}
exports.UpdateUser = (req, res) => {
  console.log(req.body)
  var id = req.body.id;
  console.log(id)
  var username = req.body.username;
  var email = req.body.email;

  AdminUser.updateOne({ _id: id }, {
    $set: {
      username: username,
      email: email,
    }
  }, (err, result) => {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }


    if (result.nModified > 0) {
      res.json({ "msg": "Record update Successfully" })
    } else {
      res.json({ "msg": "Record doesn't exist." })
    }
  })

}