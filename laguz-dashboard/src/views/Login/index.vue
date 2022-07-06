<template>
  <div id="login" class="wrapper">
    <div v-if="reset" class="content">
      <img
        src="../../assets/login_logo_white.png"
        alt="laguz"
        height="164rem"
      />

      <form @submit.prevent="reset = false" v-if="sent">
        <h5>
          O email de redefinição de senha foi enviado para o email cadastrado.
          Siga as instruções para redefinir sua senha.
        </h5>
        <button type="submit" className="btn-login">Voltar</button>
      </form>
      <form @submit.prevent="handleSend" v-else>
        <h5>
          Por favor, para resetar sua senha nos informe o seu usuário
          o seu email.
        </h5>
        <p style="color: #ff6961; font-weight: bold">
          {{ errorRecovery }}
        </p>
        <input
          name="username"
          v-model="usernameRecovery"
          type="text"
          placeholder="Seu usuário"
        />
        <input
          name="email"
          v-model="emailRecovery"
          type="email"
          placeholder="Seu email"
        />
        <a class="mt-0 mb-1" @click.prevent="reset = false">Voltar</a>
        <button type="submit" className="btn-login">
          Enviar email de redefinição
        </button>
      </form>
    </div>
    <div v-else class="content">
      <img
        src="../../assets/login_logo_white.png"
        alt="laguz"
        height="164rem"
      />

      <form @submit.prevent="handleLogin">
        <h6 class="message" v-if="error">{{ error }}</h6>
        <input
          name="username"
          v-model="username"
          type="text"
          placeholder="Seu usuário"
        />
        <input
          name="password"
          type="password"
          placeholder="Sua senha"
          v-model="password"
        />
        <a class="mt-0 mb-1" @click.prevent="resetFields"
          >Esqueceu sua senha?</a
        >
        <button type="submit" className="btn-login">Acessar</button>
      </form>
    </div>
  </div>

  <!-- Material form login -->
</template>

<script>
import { sendEmailRecovery } from "../../services/Auth";
export default {
  name: "Basic",
  data: () => ({
    username: "",
    usernameRecovery: "",
    emailRecovery: "",
    password: "",
    error: "",
    errorRecovery: "",
    reset: false,
    sent: false,
  }),
  methods: {
    handleLogin() {
      this.$store
        .dispatch("auth/login", {
          email: this.username,
          password: this.password,
        })
        .then(() => {
          this.error = "";
          this.$router.push("/");
        })
        .catch(({ error }) => {
          this.error = error;
        });
    },
    handleSend() {
      if (this.emailRecovery == "" || this.usernameRecovery == "") return;

      sendEmailRecovery({
        email: this.emailRecovery,
        username: this.usernameRecovery,
      })
        .then(() => {
          this.sent = true;
        })
        .catch(({ message }) => {
          this.errorRecovery = message;
        });
    },
    resetFields() {
      this.sent = false;
      this.emailRecovery = "";
      this.usernameRecovery = "";
      this.username = "";
      this.password = "";
      this.error = "";
      this.errorRecovery = "";
      this.reset = true;
    },
  },
};
</script>


<style scoped>
.wrapper {
  height: 100vh;
  background: linear-gradient(-5deg, #00a6b6, #0a666e);
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