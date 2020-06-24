<template>
  <div>
    <div class="header">
      <div class="logout-link" @click="signOut">Logout</div>
    </div>
    <h1>My Profile</h1>
  </div>
</template>

<script>
import { getUserFromCookie } from '@/helpers/cookies.js' 
import { auth } from "~/helpers/fireinit.js";

export default {
  asyncData({redirect, req}) {
    if (process.server) {
      console.log("login", "process.server")
      const user = getUserFromCookie(req)
      if (!user) {
        redirect('/login')
      }
    } else {
      console.log("login", "process.client")
      var user = auth.currentUser
      if (!user) {
        redirect('/login')
      }
    }
  },
  methods: {
    signOut: function() {
      console.log('sign out')
      let that = this
      auth.signOut().then(() => {
        that.$router.replace('/login')
      }).catch(error => console.log(error))
    }
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-around;
  margin: 10px 20px;
  width: 30%;
}

.logout-link {
  cursor: pointer;
  text-decoration: underline;
  color: #551a8b;
}
</style>

