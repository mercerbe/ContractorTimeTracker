import firebase from "firebase";
import { msToHMS } from "@/views/timetracker/utils/timestamp-converter";
export default {
  methods: {
    async runQuery() {
      this.loading = true;
      const ref = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection(this.collection);
      if (!this.query) {
        ref.onSnapshot(snap => {
          this.data = snap.size;
        });
      } else {
        if (!this.queryCompound) {
          ref
            .where(this.query[0], this.query[1], this.query[2])
            .get()
            .then(snap => {
              this.data = snap.size;
            });
        } else {
          ref
            .where(this.query[0], this.query[1], this.query[2])
            .where(
              this.queryCompound[0],
              this.queryCompound[1],
              this.queryCompound[2]
            )
            .get()
            .then(snap => {
              snap.docs.forEach(doc => {
                let item = doc.data();
                if (item.duration) {
                  let duration = item.duration;
                  this.data.push(duration);
                } else {
                  this.data.push(1);
                }
              });
            });
        }
      }
    }
  }
};
