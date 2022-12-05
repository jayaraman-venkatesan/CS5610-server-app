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
        const createdCurrentUser = await dao.createUser(user)
        currentUser = createdCurrentUser
        console.log("after createuser")

        console.log("exiting controller")
        if(Array.isArray(createdCurrentUser))
        {
            console.log("array")
        }
        else
        {
            console.log("not array")
        }
        console.log(createdCurrentUser);
        res.json(createdCurrentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        console.log("in controller")
        console.log(credentials)
        const existingUser = await dao.findByCredentials(credentials.userName,credentials.password)
        console.log("after existing user call")
        console.log(existingUser)
        if (existingUser.length===0) {
            console.log("no existingUser")
            res.sendStatus(403)
            return
        }
        console.log("yes existingUser")
        currentUser = existingUser[0]
        if(Array.isArray(existingUser))
        {
            console.log("array")
        }
        else
        {
            console.log("not array")
        }
        res.json(existingUser[0])
    }

    const logout = (req, res) => {
        currentUser = null
        res.sendStatus(200)
    }


    const profile = async (req, res) => {
        console.log("in profile")
        console.log(currentUser)
        if (currentUser) {
            console.log("in profile yes current user")
            res.json(currentUser)
            return
        }
        console.log("in profile no current user")
        res.sendStatus(403)
    }


    app.post('/api/register', register)
    app.post('/api/login', login)
    app.post('/logout', logout)
    app.post('/api/profile', profile)
}

export default UsersController