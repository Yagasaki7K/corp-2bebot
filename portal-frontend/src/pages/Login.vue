<template>
  <div id="login" class="wrapper">
    <div class="content">
      <img src="../assets/img/bau-avatar2.png" alt="Bau" height="164rem" />

      <form @submit.prevent="login">
        <h6 class="q-ma-none" v-if="error">{{ error }}</h6>
        <input
          name="username"
          v-model="email"
          type="text"
          placeholder="Seu email"
        />
        <input
          name="password"
          type="password"
          placeholder="Sua senha"
          v-model="password"
        />
        <button type="submit" className="btn-login">Acessar</button>
      </form>
    </div>
  </div>

  <!-- Material form login -->
</template>

<script>
import { login } from "../services/Auth";
export default {
  props: ["jwt"],
  computed: {
    logo() {
      return "";
    },
  },
  data: () => ({
    email: "",
    password: "",
    error: "",
  }),
  methods: {
    login() {
      login({ email: this.email, password: this.password })
        .then((data) => {
          this.$emit("login", data);
          let { redirect } = this.$route.query;
          if (redirect) return this.$router.push(decodeURI(redirect));
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.error = response.data?.errors[0]?.error;
        });
    },
  },
};
</script>


<style scoped>
.wrapper {
  height: 100vh;
  background: linear-gradient(-65deg, #30455d, #1f1e2e);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6%;
  padding-bottom: 8%;
}

.content {
  width: 100%;
  max-width: 315px;
  text-align: center;
  font-family: "Roboto", sans-serif;
  animation: fade;
  animation-duration: 1200ms;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  color: #e5e4e5;
}

span {
  margin-bottom: 8px;
  color: #d6546a;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

input {
  background: rgba(59, 81, 104, 0.3);
  border: 0;
  border-radius: 4px;
  height: 44px;
  padding: 0 15px;
  color: #e5e4e5;
  margin: 0 0 10px;
  box-shadow: 0 4px 6px -1px rgba(48, 69, 93, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input:placeholder {
  color: #e7e7e7;
}

button {
  margin: 5px 0 0;
  height: 44px;
  background: #30455d;
  font-weight: bold;
  color: rgb(240, 240, 240);
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
}

button:hover {
  background: #263b53;
}

a {
  color: rgb(240, 240, 240);
  margin-top: 15px;
  font-size: 16px;
  opacity: 0.8;
}

a:hover {
  opacity: 1;
}
</style>
