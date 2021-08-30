<template>
  <div class="popUpCustom">
    <div class="text-center">
      <v-dialog
          v-model.trim="dialog"
          width="600"
          style="border-radius: 0 !important"
      >
        <v-card class="borderRadiReset">
          <v-card-title
              class="headline backColorBlue3 popPad1 disFx justify-lg-space-between"
          >
            <h2 class="mainWhite mainFontS boldWt">메모</h2>
            <span class="closeBtn1 cur_p" @click="dialog = !dialog"></span>
          </v-card-title>

          <v-card-text class="pad30" style="max-height: 800px">
            <Memo :applId="applId" :maxHeight="400"></Memo>

            <div class="disFx justify-end mt10">
              <v-btn
                  class="backColorGray1 mainWhite boldWt borderReset w80 ml10"
                  text
                  @click="dialog = false"
              >
                닫기
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Memo from '../../../../components/Memo.vue'

export default {
  props: {
    applId: {
      type: Number,
    },

  },
  components: {
    Memo
  },
  data: () => ({
    dialog: true,

  }),
  methods: {

  },
  watch: {
    dialog: {
      deep: true,
      handler: function (newVal) {
        if (!newVal) {
          this.$emit('closeDialog', this.dialog, 'memoDialog');
        }
      },
    },
  },
  created() {
  },
};
</script>

<style scoped>
</style>
