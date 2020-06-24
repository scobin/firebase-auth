<template>
  <client-only>
    <div v-if="!isLogin" class="login">
      <h2 class="title">Sign In with Google</h2>
      <button @click="googleSignUp">Google Sign In</button>
    </div>
    <div v-else>
      <div class="header">
        <nuxt-link to="/profile">My profile</nuxt-link>
        <div class="logout-link" @click="signOut">Logout</div>
      </div>
      <div class="main">
        <h1>This is a private page!</h1>
      </div>
    </div>
  </client-only>
  
</template>

<script>
import { auth, GoogleProvider } from "~/helpers/fireinit.js";
import { getUserFromCookie } from '@/helpers/cookies.js' 
export default {
  asyncData({ req, redirect }) {
    console.log('asyncData')
    let isLogin = false
    if (process.server) {
      console.log("login", "process.server")
      const user = getUserFromCookie(req)
      if (user) {
        isLogin = true
      }
    } else {
      console.log("login", "process.client")
      var user = auth.currentUser
      if (user) {
        isLogin = true
      }
    }
    return {isLogin: isLogin}
  },
  mounted() {
    let that = this
    this.isLogin = auth.currentUser
    auth.getRedirectResult().then(function (result) {
        console.log('Redirect result', result)
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            
            that.isLogin = true
        }
        // The signed-in user info.
        // var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error.message)
    });
  },
  methods: {
    googleSignUp: function() {
      console.log("sign up")
      auth.signInWithRedirect(GoogleProvider)
    },
    signOut: function() {
      console.log('sign out')
      auth.signOut().then(() => {
        this.isLogin = null
      }).catch(error => console.log(error))
    }
  }
}
</script>


<style>
.login {
  margin-top: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.logout-link {
  cursor: pointer;
  text-decoration: underline;
  color: #551a8b;
}
.header {
  display: flex;
  justify-content: space-around;
  margin: 10px 20px;
  width: 30%;
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
