import { ref } from "vue"

export const store = ref({
  jwt: null,
  isLogging: false,
  isLogged: false,
  setJwt(token) {
    this.jwt = token 
  },
  setIsLogging(value) {
    this.isLogging = value
  },
  setIsLogged(value) {
    this.isLogged = value
  }
  
})

