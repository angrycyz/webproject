<template>
<v-container fluid>
<div class="hello">
  <v-layout column align-center>
<img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5" style="width:100px;height:100px;">
  <v-flex>
  <h1>{{ msg }}</h1>
</v-flex>
<v-flex><li></li></v-flex>
</v-layout>

<v-layout column align-center>
<v-flex>
<li>Zipcode</li>
<li>
<input type="search" result = "s" placeholder="Please enter a zip code"
v-model="zipcodeMessage"
v-bind:style="{ height: searchHeight, width: searchWidth, border: '2px lightgrey solid'}">
  </li>
  </v-flex>
  <v-flex><li></li></v-flex>
<v-flex>
<li>Address</li>
<li>
<input type="search" result = "s" placeholder="Please enter an address"
v-model="addressMessage"
v-bind:style="{ height: searchHeight, width: searchWidth, border: '2px lightgrey solid'}">
  </li>
  </v-flex>
  <v-flex><li></li></v-flex>
<v-flex>
<li>BlockID</li>
<li>
<input type="search" result = "s" placeholder="Please enter a block id"
v-model="blockMessage"
v-bind:style="{ height: searchHeight, width: searchWidth, border: '2px lightgrey solid'}">
  </li>
  </v-flex>
  </v-layout>


  <v-layout column text-xs-center>
<v-flex><li></li></v-flex>
<v-flex>
<v-btn small color="searchBottonColor" v-on:click="searchProperty">Search</v-btn>
  </v-flex>
  </v-layout>

  <v-layout row text-xs-center>
<v-flex>
<p>{{ searchResult }}</p>
<li v-for="(item, key) in singleFamily">
  {{ item }} {{key}}
</li>
<li v-for="(item, key) in multiFamily">
  {{ item }} {{key}}
</li>
<li v-for="(item, key) in hist">
  {{ item }} {{key}}
</li>
</v-flex>
<v-flex>
</v-flex>
</v-layout>
<v-layout fill-height>
</v-layout>
<v-layout row text-xs-center>
<v-flex>
<h2>Reference</h2>
<ul>
<li><a href="https://www.housecanary.com/" target="_blank">House Canary</a></li>
<li><a href="https://vuejs.org/">Vue.js</a></li>
<li><a href="https://github.com/axios/axios">axios</a></li>
<br>
<li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for Vue Webpack</a></li>
</ul>
</v-flex>
<v-flex>
<h2>Contacts</h2>
<ul>
<li><a href="mailto: chen.yunz@husky.neu.edu" target="_blank">E-mail</a></li>
<li>(1)781-539-9595</li>
</ul>
</v-flex>
</v-layout>
<!--</v-slide-y-transition>-->
</div>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Search for a Property!',
      // bgImage: 'url(' + require('../assets/Spain.jpeg') + ')',
      imageHeight: window.innerHeight + 'px',
      searchHeight: 40 + 'px',
      searchWidth: 200 + 'px',
      zipcodeMessage: '',
      addressMessage: '',
      blockMessage: '',
      searchBottomColor: '#509088',
      listColor: '#509088',
      searchResult: [],
      singleFamily: [],
      multiFamily: [],
      hist: []
    }
  },
  methods: {
    searchProperty(event) {
      if (event) {

        // var endpointURL = ''
        // this.addressMessage.replace(/ /g, '+')
        // if (this.zipcodeMessage && this.addressMessage) {
        //   endpointURL = '/property/details?address=' + this.addressMessage +
        //   '&zipcode=' + this.zipcodeMessage
        // } else if (this.addressMessage) {
        //   endpointURL = '/property/details?address=' + this.addressMessage
        // } else if (this.zipcodeMessage) {
        //   endpointURL = '/zip/details?zipcode=' + this.zipcodeMessage
        // } else if (this.blockMessage) {
        //   endpointURL = '/block/value_distribution?block_id=' + this.blockMessage
        // } else {
        //   console.log('No information is given.')
        // }
        var endpointURL = '/zip/details?zipcode=' + this.zipcodeMessage
        axios({
          method: 'GET',
          url: '/v2' + endpointURL,
          responseType: 'json',
          withCredentials: false,
          auth: {
            username: 'KPEIYQF4KZ5AAU9WEC3P',
            password: 'CoachhC1OwA0jmfxyqtjBIK5dDftYDII'
          }
        })
          .then(response => {
            this.searchResult = response.data[0]
            // console.log('results data', this.searchResult)
            this.singleFamily = this.searchResult['zip/details']['result']['single_family']
            this.multiFamily = this.searchResult['zip/details']['result']['multi_family']
            this.hist = this.searchResult['zip/details']['result']['historical']
          })
        // .catch(function(error) {
        //   console.log(error)
        // })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
