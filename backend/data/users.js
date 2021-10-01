const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Jon Doe',
        email: 'jon@example.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Dough',
        email: 'dough@example.com',
        password: bcrypt.hashSync('123456', 10),
       
    },
]

module.exports = users