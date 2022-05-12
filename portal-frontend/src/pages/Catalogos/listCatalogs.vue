<template>
  <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="folder"
        label="Baú"
        default-opened
      >
        <q-expansion-item
          v-for="(years, index) in catalogs"
          :key="index"
          switch-toggle-side
          dense-toggle
          :label="years.year"
          :header-inset-level="0"
          :content-inset-level="0"
        >
          <q-expansion-item
            v-for="(month, index) in years.months"
            :key="index"
            switch-toggle-side
            dense-toggle
            :label="month.name"
            :header-inset-level="1"
            :content-inset-level="0"
          >
            <q-card>
              <q-list bordered>
                <q-item
                  v-for="(catalog, index) in month.items"
                  :key="index"
                  clickable
                  v-ripple
                  @click.prevent="redirect(catalog._id)"
                >
                  <q-item-section avatar>
                    <q-avatar style="margin-left: 110px" rounded>
                      <img :src="catalog.path[0]" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    {{ catalog.name }}
                    <q-badge
                      v-if="catalog.status === 'ACTIVE'"
                      style="
                        max-width: 60px;
                        height: 17px;
                        display: flex;
                        justify-content: center;
                        font-weight: bold;
                      "
                      transparent
                      align="middle"
                      color="green"
                    >
                      Vigente
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>
      </q-expansion-item>
      <!-- <q-expansion-item disable expand-separator icon="folder" label="Baú">
        <q-expansion-item
          switch-toggle-side
          dense-toggle
          caption="Total de 2 catálogos"
          label="2018"
          :header-inset-level="0"
          :content-inset-level="0"
        >
          <q-expansion-item
            switch-toggle-side
            dense-toggle
            caption="Total de 2 catálogos"
            label="Janeiro"
            :header-inset-level="1"
            :content-inset-level="0"
          >
            <q-card>
              <q-list bordered>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar style="margin-left: 110px" rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    Catálogo 1
                    <q-badge
                      style="
                        max-width: 60px;
                        height: 17px;
                        display: flex;
                        justify-content: center;
                        font-weight: bold;
                      "
                      transparent
                      align="middle"
                      color="green"
                    >
                      Vigente
                    </q-badge>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar style="margin-left: 110px" rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Catálogo 2</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar style="margin-left: 110px" rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Catálogo 3</q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>
        <q-expansion-item
          switch-toggle-side
          dense-toggle
          caption="Total de 2 catálogos"
          label="2019"
          :header-inset-level="0"
          :content-inset-level="0"
        >
          <q-expansion-item
            switch-toggle-side
            dense-toggle
            caption="Total de 2 catálogos"
            label="Fevereiro"
            :header-inset-level="1"
            :content-inset-level="0"
          >
            <q-card>
              <q-list bordered>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar style="margin-left: 110px" rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    Catálogo 1
                    <q-badge
                      style="
                        max-width: 60px;
                        height: 17px;
                        display: flex;
                        justify-content: center;
                        font-weight: bold;
                      "
                      transparent
                      align="middle"
                      color="green"
                    >
                      Vigente
                    </q-badge>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar style="margin-left: 110px" rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Catálogo 2</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar style="margin-left: 110px" rounded>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>Catálogo 3</q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-expansion-item>
        </q-expansion-item>
      </q-expansion-item> -->
    </q-list>
  </div>
</template>

<script>
import { listTable } from "src/services/Catalogs";
export default {
  props: ["refreshCatalog"],
  data: () => ({
    catalogs: null,
  }),
  mounted() {
    this.init();
  },
  watch: {
    refreshCatalog() {
      this.init();
    },
  },
  methods: {
    init() {
      listTable().then((res) => {
        this.catalogs = res;
        // this.catalogs = res.map(item => item.name)
        // this.catalogsOps = res.map(item => item.name)
        // this.publishSelected = (res.find(item => item.status == "ACTIVE")).name
        // this.publishNative = (res.find(item => item.status == "ACTIVE")).name
      });
    },
    redirect(id) {
      this.$router.push(`/catalogos/${id}/edit`);
    },
  },
};
</script>

<style>
</style>
