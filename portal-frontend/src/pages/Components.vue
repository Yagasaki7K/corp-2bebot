<template>
  <div>
    <movable
      :disabled="unmovable"
      v-for="(component, index) in components"
      :key="index"
      @complete="$emit('complete', component.id, $event)"
      @move="$emit('move', component.id, $event)"
      @start="$emit('start', component.id, $event)"
      :posTop="(component.top * pageHeight) / 1000"
      :posLeft="
        component.secondPage
          ? (component.left * pageWidth) / 1000 + pageWidth
          : (component.left * pageWidth) / 1000
      "
      :grid="1"
    >
      <q-btn
        @click.stop="$emit('buttonClick', component, $event)"
        round
        flat
        dense
        size="md"
        :id="`element-${component.id}`"
        color="primary"
        :class="component.fade ? 'fade-animated' : ''"
      >
        <q-icon
          size="40px"
          :name="
            itemEdit && itemEdit.id == component.id
              ? 'img:icons/carrinho2.svg'
              : 'img:icons/carrinho1.svg'
          "
        />
      </q-btn>
    </movable>
  </div>
</template>

<script>
export default {
  props: {
    itemEdit: {
      type: Object,
      default: () => ({}),
    },
    components: {
      type: Array,
      default: () => [],
    },
    pageWidth: {
      type: Number,
      default: 0,
    },
    pageHeight: {
      type: Number,
      default: 0,
    },
    unmovable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    startAnim() {
      this.animation = setInterval(() => {
        let animatedElements = [];
        this.components
          .filter(({ shake, fade }) => shake || fade)
          .forEach((element) => {
            let el = document.getElementById(`element-${element.id}`);
            if (el) animatedElements.push({ el, component: element });
          });
        for (const element of animatedElements) {
          if (element.component.fade && !this.fadePlayed)
            element.el.className += " fade-animated";
          if (element.component.shake)
            element.el.className += " shake-animated";
          this.fadePlayed = true;
        }
        setTimeout(() => {
          for (const element of animatedElements) {
            element.el.className = element.el.className.replace(
              " shake-animated",
              ""
            );
            element.el.className = element.el.className.replace(
              " fade-animated",
              ""
            );
          }
        }, 500);
      }, 5000);
    },
  },
  data: () => ({
    animation: null,
    fadePlayed: false,
  }),
  beforeDestroy() {
    clearInterval(this.animation);
  },
  mounted() {
    document.querySelector(".bounding-box").appendChild(this.$el);
    this.startAnim();
  },
};
</script>

<style scoped>
.fade-animated {
  animation: fade 2s;
  animation-iteration-count: 1;
}
@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.shake-animated {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>