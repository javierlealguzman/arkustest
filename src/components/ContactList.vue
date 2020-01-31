<template>
  <div>
    <md-button v-on:click="createContact()">Create new</md-button>
    <div class="md-layout md-gutter md-alignment-center">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="md-medium-size-33 md-small-size-33 md-xsmall-size-33"
      >
        <md-card>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{contact.first_name + " " + contact.last_name }}</div>
              <div class="md-subhead">{{contact.email}}</div>
            </md-card-header-text>

            <md-card-media md-medium>
              <img :src="contact.avatar" alt="People" />
            </md-card-media>
          </md-card-header>

          <md-card-actions>
            <md-button v-on:click="showDetails(contact.id)">Details</md-button>
            <md-button v-on:click="updateContact(contact)">Edit</md-button>
            <md-button v-on:click="deleteContact(contact.id)">Delete</md-button>
          </md-card-actions>
        </md-card>
      </div>
      <Dialog
        v-on:close="closeModal()"
        @save="save"
        v-bind:show="showModal"
        v-bind:modalTitle="modalTitle"
        v-bind:contact="selectedContact"
      />

      <md-dialog-alert
      :md-active.sync="alert"
      :md-content="alertContent"
      md-confirm-text="OK"
      @md-confirm="alert = false" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Dialog from "./Dialog";

export default {
  name: "ContactList",
  components: {
    Dialog
  },
  data() {
    return {
      contacts: [],
      showModal: false,
      modalTitle: "",
      action: "",
      alert: false,
      alertContent: '',
      selectedContact: { id: 0, first_name:'', email: '', last_name: ''}
    };
  },
  methods: {
    async getContacts() {
      let datos = await axios.get("https://reqres.in/api/users");

      if (datos.data.data.length > 0) this.contacts = datos.data.data;
    },
    showDetails(id) {
      this.$router.push({ name: "detail", params: { id } });
    },
    async deleteContact(id) {
      await axios.delete(`https://reqres.in/api/users/${id}`);

      this.getContacts();
    },
    closeModal() {
      this.showModal = false;
    },
    createContact() {
      this.action = "create";
      this.modalTitle = "New Contact";
      this.showModal = true;
    },
    updateContact(contact) {
      this.selectedContact = contact;
      this.action = "edit";
      this.modalTitle = "Update Contact";
      this.showModal = true;
    } ,
    async save(contact) {
        if(this.action == 'create')
        {
            let created = await axios.post("https://reqres.in/api/users", { first_name: contact.first_name, last_name: contact.last_name, email: contact.email });
            
            if(created.status == 201) {
              this.alertContent = 'Contact created';
              this.alert = true;
            }
        }
        else if(this.action == 'edit')
        {
            let updated = await axios.put(`https://reqres.in/api/users/${contact.id}`, { first_name: contact.first_name, last_name: contact.last_name, email: contact.email });
            if(updated.status == 200) {
              this.alertContent = 'Contact Updated';
              this.alert = true;
            }
        }
        this.getContacts();
        this.showModal = false;
    }
  },
  beforeMount() {
    this.getContacts();
  }
};
</script>

<style scoped>
.md-dialog {
  background-color: #fff !important;
}
</style>