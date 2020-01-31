<template>
  <div>
    <md-dialog :md-active="show">
      <md-dialog-title>{{modalTitle}}</md-dialog-title>

      <md-dialog-content>
        <md-field>
          <label for="firstname">FirstName</label>
          <md-input type="text" name="firstname" v-model="localContact.first_name" />
        </md-field>
        <md-field>
          <label for="lastname">LastName</label>
          <md-input type="text" name="lastname" v-model="localContact.last_name" />
        </md-field>
        <md-field>
          <label for="email">Email</label>
          <md-input type="email" name="email" v-model="localContact.email" />
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="save()">save</md-button>
        <md-button class="md-primary" @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    show: Boolean,
    modalTitle: String,
    contact: {
      type: Object,
      default: function() {
        return { id: 0, first_name: "", last_name: "", email: "" };
      }
    }
  },
  data() {
    return {
      localContact: { ...this.contact}
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      console.log(this.localContact);
      this.$emit("save", this.localContact);
    }
  },
  watch: {
    'contact': {
      handler: function (newval) {
          this.localContact = {...newval}
      }
    }
  }
}
</script>

<style scoped>
.md-dialog {
  background-color: #fff !important;
}
</style>