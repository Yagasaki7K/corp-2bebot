<template>
  <div
    style="margin-top: 10%"
    class="animated fadeIn d-flex align-items-center justify-content-center"
    v-if="isLoading"
  >
    <div
      style="width: 10rem; height: 10rem"
      class="spinner-border text-primary"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <section v-else class="animated fadeIn" id="users">
    <mdb-row>
      <add-user :show="showAdd" @close="showAdd = false" @updated="init" />
      <edit-user
        :show="showEdit"
        :itemEdit="itemEdit"
        @close="showEdit = false"
        @updated="init"
      />
      <remove-user
        :show="showRemove"
        :itemRemove="itemRemove"
        @close="showRemove = false"
        @updated="init"
      />
      <block-user
        :show="showBlock"
        :itemBlock="itemBlock"
        @close="showBlock = false"
        @updated="init"
      />
      <unblock-user
        :show="showUnblock"
        :itemUnblock="itemUnblock"
        @close="showUnblock = false"
        @updated="init"
      />
      <mdb-col class="mt-4" md="12">
        <div class="d-flex justify-content-between flex-wrap">
          <form @submit.prevent class="d-flex align-items-center mr-5">
            <mdb-icon icon="search" class="mr-3" />

            <mdb-input
              style="width: 210px"
              class="m-0"
              type="text"
              v-model="inputSearch"
              placeholder="Digite o texto para filtrar"
            />
          </form>
          <mdb-btn
            color="blue-grey"
            class="btn btn-rounded m-0 mb-2 float-right"
            @click.native="showAdd = true"
          >
            Novo Usuário
          </mdb-btn>
        </div>
        <mdb-tbl hover bordered class="">
          <colgroup>
            <col :span="columns.length - 1" />
            <col style="width: 250px" />
          </colgroup>
          <thead class="bg-color-table darken-3">
            <tr class="text-white">
              <th v-for="(item, index) in columns" :key="index">
                {{ item }}
                <mdb-icon
                  v-if="
                    item == 'Usuário' ||
                    item == 'Email' ||
                    item == 'Nome' ||
                    item == 'Grupo'
                  "
                  @click.native="handleSort(item)"
                  style="cursor: pointer; margin-left: 4px"
                  icon="sort"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filtered" :key="item.id">
              <td>
                <div class="d-flex flex-column">
                  <span class="first-text font-weight-bold">{{
                    item.email
                  }}</span>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <span class="first-text font-weight-bold">{{
                    item.name
                  }}</span>
                </div>
              </td>
              <td>
                <div class="d-flex">
                  <!-- <mdb-btn
                    type="button"
                    class="btn btn-blue btn-rounded btn-sm"
                    @click.native="
                      () => {
                        itemEdit = { ...item };
                        showEdit = true;
                      }
                    "
                  >
                    <mdb-icon icon="user-edit" />
                  </mdb-btn>
                  <mdb-btn
                    v-if="!item.blocked"
                    type="button"
                    class="btn btn-red btn-rounded btn-sm"
                    @click.native="
                      () => {
                        itemBlock = { ...item };
                        showBlock = true;
                      }
                    "
                  >
                    <mdb-icon icon="fas fa-lock" />
                  </mdb-btn>
                  <mdb-btn
                    v-else
                    type="button"
                    class="btn btn-green btn-rounded btn-sm"
                    @click.native="
                      () => {
                        itemUnblock = { ...item };
                        showUnblock = true;
                      }
                    "
                  >
                    <mdb-icon icon="fas fa-unlock" />
                  </mdb-btn> -->
                  <mdb-btn
                    type="button"
                    class="btn btn-red btn-rounded btn-sm"
                    @click.native="
                      () => {
                        itemRemove = { ...item };
                        showRemove = true;
                      }
                    "
                  >
                    <mdb-icon icon="trash" />
                  </mdb-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </mdb-tbl>
        <mdb-pagination lg class="justify-content-center">
          <!-- <mdb-page-item :disabled="page == 1 ? true : false">Primeiro</mdb-page-item> -->
          <mdb-page-nav :disabled="page == 1 ? true : false"></mdb-page-nav>
          <mdb-page-item
            v-if="getPages.indexOf(1) < 0"
            class="mr-2"
            @click.native="alterPage(1)"
            >{{ 1 }}</mdb-page-item
          >
          <div
            v-if="getPages.indexOf(1) < 0"
            class="d-flex align-items-end mr-2"
            style="font-size: 20px"
          >
            ...
          </div>
          <mdb-page-item
            @click.native="alterPage(n)"
            v-for="n in getPages"
            :key="n"
            :active="page == n ? true : false"
            >{{ n }}</mdb-page-item
          >
          <div
            v-if="getPages.indexOf(totalPages) < 0"
            class="d-flex align-items-end ml-2"
            style="font-size: 20px"
          >
            ...
          </div>
          <mdb-page-item
            v-if="getPages.indexOf(totalPages) < 0"
            class="ml-2"
            @click.native="alterPage(totalPages)"
            >{{ totalPages }}</mdb-page-item
          >
          <!-- <mdb-page-item>Último</mdb-page-item> -->
        </mdb-pagination>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import {
  mdbRow,
  mdbCol,
  mdbTbl,
  mdbBtn,
  mdbIcon,
  mdbInput,
  mdbPagination,
  mdbPageItem,
  mdbPageNav,
} from "mdbvue";
import EditUser from "./Components/EditUser.vue";
import AddUser from "./Components/AddUser.vue";
import RemoveUser from "./Components/RemoveUser.vue";
import BlockUser from "./Components/BlockUser.vue";
import UnblockUser from "./Components/UnblockUser.vue";
import { list } from "@/services/Auth.js";
export default {
  data: () => ({
    sort: true,
    showAdd: false,
    showEdit: false,
    showRemove: false,
    showBlock: false,
    showUnblock: false,
    itemEdit: {},
    itemRemove: {},
    itemBlock: {},
    itemUnblock: {},
    users: [],
    filtered: [],
    columns: [ "Email", "Nome",  "Ação"],
    roles: {
      distributor: "Distribuidor",
      analytics: "Analitico",
      corporate: "Administrador",
    },
    isLoading: true,
    inputSearch: "",
    limit: 10,
    page: 1,
    totalPages: 0,
    dataSearch: [],
  }),
  computed: {
    getPages() {
      let nextPages = [];
      let previousPages = [];
      if (this.page + 1 <= this.totalPages) nextPages.push(this.page + 1);
      if (this.page + 2 <= this.totalPages) nextPages.push(this.page + 2);
      if (this.page - 2 > 0) previousPages.push(this.page - 2);
      if (this.page - 1 > 0) previousPages.push(this.page - 1);

      return [...previousPages, this.page, ...nextPages];
    },
  },
  watch: {
    inputSearch() {
      const filtered = this.users.filter(this.filterUser);
      this.dataSearch = filtered;
      this.page = 1;
      this.totalPages = parseInt(Math.ceil(filtered.length / this.limit));
      this.filtered = this.paginate(filtered, this.limit, this.page);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    alterPage(n) {
      this.page = n;
      const data = this.dataSearch.length > 0 ? this.dataSearch : this.users;
      this.filtered = this.paginate(data, this.limit, this.page);
    },
    paginate(array, page_size, page_number) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
    handleSort(item) {
      this.sort = !this.sort;
      if (item == "Usuário") {
        (this.dataSearch.length > 0
          ? this.dataSearch
          : this.users
        ).sort((a, b) =>
          this.sortFn(a.name.toLowerCase(), b.name.toLowerCase())
        );
      }
      if (item == "Email") {
        (this.dataSearch.length > 0
          ? this.dataSearch
          : this.users
        ).sort((a, b) =>
          this.sortFn(a.email.toLowerCase(), b.email.toLowerCase())
        );
      }
      if (item == "Nome") {
        (this.dataSearch.length > 0
          ? this.dataSearch
          : this.users
        ).sort((a, b) =>
          this.sortFn(a.name.toLowerCase(), b.name.toLowerCase())
        );
      }
      // if (item == "Grupo") {
      //   (this.dataSearch.length > 0
      //     ? this.dataSearch
      //     : this.users
      //   ).sort((a, b) =>
      //     this.sortFn(
      //       this.whereRole(a.role).toLowerCase(),
      //       this.whereRole(b.role).toLowerCase()
      //     )
      //   );
      // }
      this.alterPage(1);
    },
    sortFn(a, b) {
      if (this.sort) return a > b ? 1 : b > a ? -1 : 0;
      return a < b ? 1 : b < a ? -1 : 0;
    },
    filterUser(user) {
      return (
        user.email.toLowerCase().includes(this.inputSearch.toLowerCase()) ||
        // this.whereRole(user.role)
        //   .toLowerCase()
        //   .includes(this.inputSearch.toLowerCase()) ||
        user.name.toLowerCase().includes(this.inputSearch.toLowerCase())
      );
    },
    init() {
      this.showAdd = false;
      this.showEdit = false;
      this.showRemove = false;
      this.showBlock = false;
      this.showUnblock = false;
          this.isLoading = false;
      list()
        .then((data) => {
          this.users = data;
          this.totalPages = parseInt(Math.ceil(data.length / this.limit));
          this.filtered = this.paginate([...data], this.limit, this.page);
        })
        .catch(console.error);
    },
    // whereRole(role) {
    //   if (role) {
    //     return this.roles[role.name] || "";
    //   }
    //   return "";
    // },
  },
  components: {
    mdbRow,
    mdbCol,
    mdbTbl,
    mdbBtn,
    EditUser,
    AddUser,
    mdbIcon,
    RemoveUser,
    BlockUser,
    UnblockUser,
    mdbInput,
    mdbPagination,
    mdbPageItem,
    mdbPageNav,
  },
};
</script>

<style>
</style>