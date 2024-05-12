const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/users.json`));

// User handlers
exports.getUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(el => el.id === id);

    if(id > users.length || !user){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
};

exports.updateUser = (req, res) => {
    if(req.params.id > users.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            user: 'Updated user'
        }
    });
};

exports.deleteUser = (req, res) => {
    // Implement your delete logic here
};

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            users: users
        }
    });
};

exports.createUser = (req, res) => {
    const newId = users[users.length-1].id + 1;
    const newUser = {
        id: newId,
        ...req.body
    };
    users.push(newUser);
    fs.writeFile(`${__dirname}/../dev-data/users.json`, JSON.stringify(users), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                users: "updated the new user"
            }
        });
    });
};

exports.validateUser = (req, res, next) => {
    console.log('in validateUser function the request is: ', req.body)
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or email'
        });
    }

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(409).json({
            status: 'fail',
            message: 'User already exists'
        });
    }

    console.log('User is valid, verified by the first middleware');
    next();
}