<template>
  <div>
    hello chat app
    <input type="text" v-model="message"/>
    <button @click="clickButton()">Send Msg</button>
    <p>Chat board</p>
    <ul>
      <li></li>
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
        console.log(data)
        console.log('this method was fired by the socket server. eg: io.emit("chatMessage", data)')
      }
    },
    methods: {
      clickButton: function () {
        console.log('button clicked');
        console.log(this.message);
        // $socket is socket.io-client instance
        this.$socket.client.emit('chatMessage', this.message);
      }
    },
    data: () => {
      return {
        message: '',
      };
    },
    computed: {

    },
    mounted() {
      // this.$socket.on('chatMessage',data => {
      //   console.log('listen fired')
      //   console.log(data);
      //
      // });

    }
  }
</script>
