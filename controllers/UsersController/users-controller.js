import * as dao from './../../dao/users-dao.js'
let currentUser = null
const UsersController = (app) => {

    const register = async (req, res) => {
        const user = req.body
        console.log("in controller")
        console.log(user)
        const existingUser = await dao.findByUsername(user.userName)
        console.log("after findbyusername")
        if (existingUser.length!==0) {
            console.log(existingUser)
            console.log("existing user")
            res.sendStatus(403)
            return
        }
        console.log("before createuser")
        const actualUser = await dao.createUser(user)
        console.log("after createuser")
        currentUser = actualUser
        console.log("exiting controller")
        console.log(currentUser);
        res.json(actualUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await dao.findByCredentials(credentials.userName, credentials.password)
        if (!existingUser) {
            res.sendStatus(403)
            return
        }
        currentUser = existingUser
        res.json(existingUser)
    }

    const logout = (req, res) => {
        currentUser = null
        res.sendStatus(200)
    }

    app.post('/api/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
}

export default UsersController