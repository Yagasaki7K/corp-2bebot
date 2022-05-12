<template>
  <q-splitter
    style="border-top: 1px solid #d3d0d0"
    separator-style="width: 0px"
    v-model="splitterModel"
  >
    <template v-slot:before>
      <q-tabs
        active-color="blue-10"
        class="bg-grey-2 text-grey-7"
        v-model="innerTabConfig"
        vertical
      >
        <q-tab
          class="border-tabs"
          name="innerNameUrl"
          icon="link"
          label="Nome e URL"
        />
        <q-tab
          class="border-tabs"
          name="pdfDownload"
          icon="download"
          label="Download do PDF"
        />
        <q-tab
          class="border-tabs"
          name="paginas"
          icon="auto_stories"
          label="Páginas"
        />
        <q-tab
          class="border-tabs"
          name="innerCookies"
          icon="gavel"
          label="Cookies"
        />
        <q-tab
          class="border-tabs"
          name="innerPassword"
          icon="password"
          label="Senha"
        />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="innerTabConfig"
        animated
        transition-prev="slide-down"
        transition-next="slide-up"
      >
        <q-tab-panel name="innerNameUrl">
          <name-url
            v-on:refreshCatalog="$emit('refreshData')"
            :catalog="catalog"
          />
        </q-tab-panel>

        <q-tab-panel name="innerPublish">
          <div class="text-h4 q-mb-md">Alarms</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
        </q-tab-panel>
        <q-tab-panel name="pdfDownload">
          <download :catalog="catalog" />
        </q-tab-panel>
        <q-tab-panel name="paginas">
          <pages :catalog="catalog" :pages="catalog.path || []" />
        </q-tab-panel>

        <q-tab-panel name="innerCookies">
          <cookies
            v-on:refreshCatalog="$emit('refreshData')"
            :catalog="catalog"
          />
        </q-tab-panel>
        <q-tab-panel name="innerPassword">
          <password
            v-on:refreshCatalog="$emit('refreshData')"
            :catalog="catalog"
          />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script>
import Cookies from "./tabs/cookies.vue";
import Pages from "./tabs/pages.vue";
import Download from "./tabs/download.vue";
import nameUrl from "./tabs/nameUrl.vue";
import Password from "./tabs/password.vue";
export default {
  components: {
    nameUrl,
    Cookies,
    Password,
    Pages,
    Download,
  },
  props: ["catalog"],
  data: () => ({
    innerTabConfig: "innerNameUrl",
    splitterModel: 19,
  }),
};
</script>

<style>
.border-tabs {
  border-bottom: 1px solid #d3d0d0;
}
</style>
