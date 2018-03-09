<template>
  <v-container fluid>
        <!--<div class="hello" v-bind:style="{ backgroundImage: bgImage, height: imageHeight }">-->
      <div class="hello">
            <v-layout column align-center>
              <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5" style="width:100px;height:100px;">
              <v-flex>
                <h1>{{ msg }}</h1>
              </v-flex>
            </v-layout>

        <v-layout column align-center>
          <v-flex>
            <li>Zipcode</li>
            <li>
              <input type="search"
                     result = "s"
                     placeholder="Please enter a zip code"
                     v-on:keyup.enter="searchZipcode"
                     v-model.trim="zipcodeMessage"
                     v-bind:style="{ height: searchHeight, width: searchWidth, border: '2px lightgrey solid'}">
            </li>
          </v-flex>
          <v-flex><li></li></v-flex>
          <v-flex>
            <li>Address</li>
            <li>
              <input type="search"
                     result = "s"
                     placeholder="Please enter an address"
                     v-on:keyup.enter="searchZipcode"
                     v-model.trim="addressMessage"
                     v-bind:style="{ height: searchHeight, width: searchWidth, border: '2px lightgrey solid'}">
            </li>
          </v-flex>
          <v-flex><li></li></v-flex>
          <v-flex>
            <li>BlockID</li>
            <li>
              <input type="search"
                     result = "s"
                     placeholder="Please enter a block id"
                     v-on:keyup.enter="searchZipcode"
                     v-model.trim="blockMessage"
                     v-bind:style="{ height: searchHeight, width: searchWidth, border: '2px lightgrey solid'}">
            </li>
          </v-flex>
        </v-layout>


        <v-layout column text-xs-center>
          <v-flex><li></li></v-flex>
          <v-flex>
            <v-btn small color="searchBottonColor" v-on:click="searchZipcode">Search</v-btn>
          </v-flex>
        </v-layout>

            <v-layout column align-center>
              <div class="hello" v-bind:style="{ backgroundColor: veryLightBlue, height: 350 + 'px', width: 700 + 'px', overflow: 'auto' }">
              <div v-if="this.addressMessage !== ''">
                <v-flex text-xs-center md12>
                  <p> Result for address searching </p>
                </v-flex>
                <v-flex>
                  <v-btn depressed small>Property</v-btn>
                </v-flex>
                <v-flex>
                  <table v-for="(item, key) in addressInfo">{{key}} : {{ item }}</table>
                </v-flex>
              </div>

              <div v-else-if="this.zipcodeMessage !== ''">
                <v-flex text-xs-center md12>
                <p> Result for zipcode searching </p>
                </v-flex>
                <v-flex>
                  <v-btn depressed small>Address Information(Geocode)</v-btn>
                </v-flex>
                <v-flex>
                  <table v-for="(item, key) in addressInfo">{{key}} : {{ item }}</table>
                </v-flex>
              </div>

              <div v-else-if="this.blockMessage !== ''">
                <v-flex text-xs-center md12>
                  <p> Result for block searching </p>
                </v-flex>
                <v-flex>
                  <v-btn depressed small>Result</v-btn>
                </v-flex>
                <v-flex>
                  <table v-for=v-for="(item, key) in blockResult">{{key}} : {{ item }}</table>
                </v-flex>
              </div>
              <div v-else>
                <v-flex text-xs-center md12>
                No Information is given
                </v-flex>
              </div>
              </div>
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
        // imageHeight: window.innerHeight + 'px',
        searchHeight: 40 + 'px',
        searchWidth: 200 + 'px',
        zipcodeMessage: '',
        addressMessage: '',
        blockMessage: '',
        searchBottomColor: '#509088',
        listColor: '#5892f1',
        veryLightBlue: '#D4E8F9',
        lightBlue: '#9DCFF9',
        searchResult: [],
        addressInfo: [],
        propertyInfo: [],
        assessmentInfo: [],
        blockResult: []
      }
    },
    methods: {
      searchZipcode (event) {
        if (event) {
          var endpointURL = ''
          this.addressMessage.replace(/ /g, '+')
          if (this.zipcodeMessage !== '' && this.addressMessage !== '') {
            endpointURL = 'property/geocode?address=' + this.addressMessage +
            '&zipcode=' + this.zipcodeMessage
          } else if (this.addressMessage !== '') {
            endpointURL = 'property/geocode?address=' + this.addressMessage
          } else if (this.zipcodeMessage !== '') {
            endpointURL = '/zip/details?zipcode=' + this.zipcodeMessage
          } else if (this.blockMessage !== '') {
            endpointURL = '/block/value_distribution?block_id=' + this.blockMessage
          } else {
            console.log('No information is given.')
          }
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
              console.log('results data', this.searchResult)
              if (this.addressMessage !== '' && this.zipcodeMessage !== '') {
                var tmp = this.searchResult['address_info']
                delete tmp.status
                this.addressInfo = tmp
              } else if (this.addressMessage !== '') {
                this.propertyInfo = this.searchResult['property/details']['result']['property']
                this.assessmentInfo = this.searchResult['property/details']['result']['assessment']
              } else {
                this.blockResult = this.searchResult['block/value_distribution']['result']
              }
            })
              .catch(function (error) {
                console.log(error)
              })
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
