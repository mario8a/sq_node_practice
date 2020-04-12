const User = require('../models/user');

module.exports = function(app) {

    app.get('/users', (req, res) => {
        User.getUsers((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/users', (req, res) => {
        const userData = {
            id: null,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };

        User.insertUser(userData, (err, data) => {
            console.log(data)
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'Usuario insertado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Algo salio mal'
                })
            }
        });
    });

    app.put('/users/:id', (req, res) => {
        const userData = {
            id: req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };
        User.updateUser(userData, (err, data) => {
            if (data && data.msg) {
                res.json(data);
            } else {
                res.json({
                    success: false,
                    msg: "Error"
                })
            }
        })
    })

    app.delete('/users/:id', (req, res) => {
        User.deleteUser(req.params.id, (err, data) => {
            if (data && data.msg === 'user deleted' || data.msg === 'no existe el usuario') {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: err
                });
            }
        });
    });
};