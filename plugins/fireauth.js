import { auth } from '~/helpers/fireinit.js'
import Cookies from 'js-cookie'

export default context => {
    const { store } = context

    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            console.log("auth's state changed!", user)
            if (user) {
                auth.currentUser.getIdToken(true)
                    .then(token => {
                        Cookies.set('access_token', token)
                    })
            } else {
                Cookies.remove('access_token')
            }
            return resolve()
        })
    })
}