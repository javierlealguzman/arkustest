<template>
  <div>
    <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{contact.first_name + " " + contact.last_name }}</div>
            <div class="md-subhead">{{contact.email}}</div>
            <div class="md-subhead">Id: {{contact.id}}</div>
          </md-card-header-text>

          <md-card-media md-medium>
            <img :src="contact.avatar" alt="People" />
          </md-card-media>
        </md-card-header>
      </md-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ContactDetail",
  data() {
    return {
      contact: {}
    };
  },
  methods: {
    async getDetailsById(id) {
      let details = await axios.get(`https://reqres.in/api/users/${id}`);

      this.contact = details.data.data;
    }
  },
  beforeMount() {
    this.getDetailsById(this.$route.params.id);
  }
};
</script>