<template>
  <div class="flexible-content animated fadeIn">

  <div v-if="$route.name !== 'Login'" class="flexible-content">
    <NavbarComponent />
    <!-- Sidebar -->
    <SidebarComponent />
    <!-- /Sidebar  -->
    <main >
      <div class="mt-5 p-5">
        <router-view></router-view>
      </div>
      <ftr color="primary-color-dark" class="text-center font-small darken-2">
      </ftr>
    </main>
  </div>
  <router-view  v-else></router-view>

  </div>
</template>

<script>
import {
  mdbFooter,
  waves,
} from "mdbvue";

import NavbarComponent from '@/components/Navbar'
import SidebarComponent from '@/components/Sidebar'

export default {
  name: "AdminTemplate",
  components: {
    NavbarComponent,
    SidebarComponent,
    ftr: mdbFooter,
  },
  mixins: [waves],
};
</script>

<style scoped>
main {
  background-color: #f3f6f9;
}

.flexible-content {
  transition: all 0.3s;
  padding-left: 200px;
}
.content {
  height: 100vh;
  
}

</style>
