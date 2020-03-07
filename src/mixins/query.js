import firebase from "firebase";
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
              let total = 0; //in millseconds
              snap.docs.forEach(doc => {
                let item = doc.data();
                let duration = item.duration;
                total = total + duration;
              });
              this.data = msToHMS(total);
            });
        }
      }
    }
  }
};
