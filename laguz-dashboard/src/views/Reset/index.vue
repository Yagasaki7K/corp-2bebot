<template>
  <div id="login" class="wrapper">
    <div class="content">
      <form @submit.prevent="confirmChange">
        <h5>
          Para resetar sua senha, por favor, digite sua nova senha no campo
          abaixo.
        </h5>
        <p style="color: #ff6961; font-weight: bold">
          {{ error }}
        </p>
        <input
          name="newPassword"
          v-model="newPass"
          type="password"
          placeholder="Nova senha"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua nova senha"
          v-model="newPassConfirm"
        />
        <button type="submit" className="btn-login">Confirmar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { resetPass } from "../../services/Auth";
export default {
  data: () => ({
    newPass: "",
    newPassConfirm: "",
    error: "",
  }),
  mounted() {
    this.token = this.$route.query.token;
    this.$nextTick(() => {
      this.$store.dispatch("auth/logout");
    });
  },
  methods: {
    confirmChange() {
      if (this.newPass != this.newPassConfirm)
        return (this.error = "As senhas não coincidem.");
      if (this.newPass.length < 6)
        return (this.error = "Sua senha deve conter 6 ou mais dígitos.");
      if (this.newPass == "123456")
        return (this.error = "Você não pode utilizar essa senha.");
      resetPass({ token: this.token, password: this.newPass })
        .then(() => {
          this.error = "";
          this.$router.push("/login");
        })
        .catch((err) => {
          this.error = `${err.message}`;
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