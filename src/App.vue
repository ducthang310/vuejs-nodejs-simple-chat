<template>
  <div>
    hello chat app
    <form v-on:submit.prevent="clickButton">
      <input type="text" v-model="message"/>
      <button type="submit">Send Msg</button>
    </form>

    <p>Chat board</p>
    <ul class="messages">
      <li class="message" v-for="item in items" :key="item.message" v-bind:class="{ 'myself': item.myself }">
        <span v-if="!item.myself">Other: </span> {{ item.message }}
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: "Home",
    sockets: {
      connect: function () {
        console.log('socket connected')
      },
      chatMessage: function(data) {
        console.log(data);
        data.myself = data.socket_id === this.$socket.client.id;
        this.items.push(data);
      }
    },
    methods: {
      clickButton: function () {
        this.$socket.client.emit('chatMessage', this.message);
        this.message = null;
      }
    },
    data: () => {
      return {
        message: '',
        items: []
      };
    },
    computed: {

    }
  }
</script>
<style>
  body {
    background: #f6f6f6;
  }
  .messages {
    list-style: none;
    border: 1px solid #e4e4e4;
    background: #ffffff;
    padding: 15px;
    width: 350px;
    min-height: 100px;
  }
  .message {
    width: 100%;
    padding: 5px 0;
  }
  .myself {
    text-align: right;
  }
</style>
