<template>
 <mdb-container>
    <section class="text-center my-5">
      <h2 class="h1-responsive font-weight-bold my-5">Editar Perfil</h2>
      <mdb-row>
        <mdb-col lg="12" md="12" class="mb-lg-0 mb-4">
          <mdb-card testimonial>
            <mdb-card-up color="info"></mdb-card-up>
            <mdb-avatar class="mx-auto white">
              <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg" class="rounded-circle img-fluid"/>
            </mdb-avatar>
            <mdb-card-body>
              <h4 class="font-weight-bold mb-0">Andre Behera</h4>
              <h5 class="font-weight-bold mb-1">Safira</h5>
              <h5 class="first-text font-weight-bold mb-1">andrebehera - 5511970248965 - andrebehera@hotmail.com</h5>
              <hr/>
              <p class="dark-grey-text mt-4"><mdb-icon icon="quote-left" class="pr-2"></mdb-icon>Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing elit.</p>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbAvatar,
  mdbIcon
  // mdbTbl,
} from "mdbvue";
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbAvatar,
    mdbIcon
  }
}
</script>

<style>

</style>