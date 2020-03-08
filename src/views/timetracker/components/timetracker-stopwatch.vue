<script>
export default {
  data() {
    return {
      times: [],
      animateFrame: 0,
      endDateTime: null,
      nowTime: 0,
      diffTime: 0,
      startTime: 0,
      startDateTime: null,
      isRunning: false
    };
  },
  methods: {
    setSubtractStartTime(time) {
      var time = typeof time !== "undefined" ? time : 0;
      this.startTime = Math.floor(performance.now() - time);
    },

    startTimer() {
      var vm = this;
      vm.startDateTime = new Date();
      vm.setSubtractStartTime(vm.diffTime);

      (function loop() {
        vm.nowTime = Math.floor(performance.now());
        vm.diffTime = vm.nowTime - vm.startTime;
        vm.animateFrame = requestAnimationFrame(loop);
      })();
      vm.isRunning = true;
    },

    stopTimer(cleared) {
      this.isRunning = false;
      this.endDateTime = new Date();
      cancelAnimationFrame(this.animateFrame);
      if (!cleared) {
        this.$emit(
          "timer_stopped",
          this.startDateTime,
          this.endDateTime,
          this.diffTime
        );
      }
    },

    pushTime() {
      this.times.push({
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        milliSeconds: this.milliSeconds
      });
    },

    clearAll() {
      this.startTime = 0;
      this.nowTime = 0;
      this.diffTime = 0;
      this.times = [];
      this.stopTimer(true);
      this.animateFrame = 0;
    }
  },
  computed: {
    hours() {
      return Math.floor(this.diffTime / 1000 / 60 / 60);
    },

    minutes() {
      return Math.floor(this.diffTime / 1000 / 60) % 60;
    },

    seconds() {
      return Math.floor(this.diffTime / 1000) % 60;
    },

    milliSeconds() {
      return Math.floor(this.diffTime % 1000);
    }
  },
  filters: {
    zeroPad(value, num) {
      var num = typeof num !== "undefined" ? num : 2;
      return value.toString().padStart(num, "0");
    }
  }
};
</script>

<template>
  <v-container>
    <p
      class="headline"
    >Elapsed Time: {{ hours }}:{{ minutes | zeroPad }}:{{ seconds | zeroPad }}:{{ milliSeconds | zeroPad(3) }}</p>
    <v-btn dark color="green" class @click="startTimer" :disabled="isRunning">START</v-btn>
    <v-btn dark color="red" class @click="stopTimer(false)" :disabled="!isRunning">STOP</v-btn>
    <v-btn class @click="clearAll">CLEAR</v-btn>
  </v-container>
</template>
