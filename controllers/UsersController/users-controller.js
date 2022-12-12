import * as dao from './../../dao/users-dao.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let currentUser = null
const UsersController = (app) => {

    const saltRounds = 10;

    const register = async (req, res) => {
        let user = req.body
        console.log(user)
        const existingUser = await dao.findByUsername(user.userName)
        console.log("after findbyusername")
        if (existingUser) {
            console.log(existingUser)
            console.log("existing user")
            res.sendStatus(403)
            return
        } 
        console.log("before createuser")
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
        const createdCurrentUser = await dao.createUser(user)
        currentUser = createdCurrentUser
        console.log("after createuser")

        console.log("exiting controller")
        if (Array.isArray(createdCurrentUser)) {
            console.log("array")
        }
        else {
            console.log("not array")
        }
        console.log(createdCurrentUser);
        res.json(createdCurrentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const user = await dao.findByUsername(credentials.userName)
        if (!user) {
            res.sendStatus(403);
            return;
        }
        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) {
            res.sendStatus(403);
            return;
        }
        const accessToken = jwt.sign({ userName: user.userName }, process.env.JWT_ACCESS_TOKEN_SECRET)
        res.json({ accessToken })
    }

    const getUser = async (req, res) => {
        const accessToken = req.headers?.authorization?.split(' ')[1];
        if (accessToken) {
            const { userName } = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
            if (userName) {
                const user = await dao.findByUsername(userName);
                res.json(user);
                return;
            }
        }
        res.sendStatus(403);
        return;
    }

    const logout = (req, res) => {
        currentUser = null
        res.sendStatus(200)
    }


    const profile = async (req, res) => {
        console.log("in profile")
        console.log(currentUser)
        if (currentUser) {
            console.log("in profile yes current user", currentUser)
            res.json(currentUser)
            return
        }
        const anonymousUser = await dao.findUserById("00000000001");
        console.log("SENDING ANONYMOUS USER", anonymousUser);
        res.json(anonymousUser);
    }

    const getDetailsByName = async (req, res) => {

        console.log("test")

        const userName = req.params.username;
        console.log(userName)
        let userObj = await dao.findByUsername(userName);

        console.log(userObj)

        if (!userObj) {
            res.sendStatus(403);
            return;
        }

        delete userObj.password;

        res.json(userObj);
        return


    }

    const updateProfile = async (req, res) => {
        const userToUpdate = req.params.id;
        const data = req.body;
        console.log(userToUpdate)
        console.log(data)
        const status = await dao.updateProfile(userToUpdate,
            data);
        res.json(status);
    }


    app.post('/api/register', register)
    app.post('/api/login', login)
    app.post('/logout', logout)
    app.post('/api/profile', profile)
    app.put('/api/user/update/:id', updateProfile)
    app.get('/api/user/:username', getDetailsByName)
    app.get('/api/user', getUser)
}

export default UsersController