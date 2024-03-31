<script setup>
  import axios from "axios"
  const emit =  defineEmits(['logged-in', 'logging-in'])


  window.login = async response => {
    const postBody = {
      token: response.credential
    }
    const loginResponse = await axios.post("https://osusachdb.ignacioladal.workers.dev/user/login", postBody)

    if (loginResponse.status != 200) {
      return
    }

    emit('logged-in', loginResponse.data, response.credential) 

  }

  window.buttonUpdate = async response => {
    console.log(response)
    emit('logging-in', response)
  }


</script>

<template>
  <component :is="'script'" src="https://accounts.google.com/gsi/client" async></component>
  <div id="g_id_onload"
  data-client_id="348322131199-pibdnbbmtllb5e5e361rhi8rhmka2637.apps.googleusercontent.com"
    data-context="signup"
    data-ux_mode="popup"
    data-callback="login"
    data-auto_select="true"
    data-itp_support="true"
    data-moment_callback="buttonUpdate"
    >
  </div>

  <div class="g_id_signin"
    data-type="standard"
    data-shape="pill"
    data-theme="outline"
    data-text="signin_with"
    data-size="large"
    data-logo_alignment="left">
  </div>


</template>
