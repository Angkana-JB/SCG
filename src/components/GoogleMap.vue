<template>
  <div>
    <div>
      <h2>Search Location Restaurant</h2>
      <div class="container">
        <GMapAutocomplete
          placeholder="Search Location"
          @place_changed="setPlace"
          v-model="coordinates"
        >
        </GMapAutocomplete>
        <button type="button" class="btn btn-primary" @click="addMarker">
          Search
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="findDataAPI">
          Connect API.
        </button>
      </div>
      <br />
      <div class="row">
        <div class="col-sm-4 overflow-auto" style="width: 300px; height: 400px">
          <ol
            class="list-group list-group-numbered"
            v-for="place in places"
            :key="place.id"
          >
            <li class="list-group-item">
              {{ place.name }} <br />
              {{ place.vicinity }}
            </li>
          </ol>
        </div>
        <div class="col-sm-8">
          <div class="row">
            <GMapMap
              :center="center"
              :zoom="12"
              map-type-id="terrain"
              style="width: 100%; height: 300px"
            >
              <GMapCluster>
                <GMapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center = m.position"
                />
              </GMapCluster>
            </GMapMap>
          </div>
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 13.828, lng: 100.528 },
      currentPlace: null,
      markers: [],
      places: [],
      lati: 0,
      lngi: 0,
      latLng: {},
    };
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      //add marker from textsearch
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        this.lati = this.currentPlace.geometry.location.lat();
        this.lngi = this.currentPlace.geometry.location.lng();
        this.findDataAPI();
      }
    },
    geolocate() {
      //call location now
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    findDataAPI() {
      //find
      const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location==${this.lati},${this.lngi}
      &type=restaurant
      &radius=50000
      &key=AIzaSyDPfW-c-72Rl6y94RlJqwEhbF2TOwd0Vdg`;
      axios
        .get(URL)
        .then((response) => {
          this.places = response.data.results;
         // console.log(this.places);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    testAPIrequest() {
      const URL = "https://jsonplaceholder.typicode.com/comments?postId=1";
      axios
        .get(URL)
        .then((response) => {
          this.places = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>
