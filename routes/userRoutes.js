const express = require('express');
router = express.Router();

// User handlers
getUser = (req, res) => {
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

updateUser = (req, res) => {
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

deleteUser = (req, res) => {
    // Implement your delete logic here
};

getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            users: users
        }
    });
};

createUser = (req, res) => {
    const newId = users[users.length-1].id + 1;
    const newUser = {
        id: newId,
        ...req.body
    };
    users.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data.json`, JSON.stringify(users), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                users: "updated the new user"
            }
        });
    });
};

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;