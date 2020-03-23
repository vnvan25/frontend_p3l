<template id="add-post">
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>City Name</th>
          <th>Country id</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="(subcategory, index) in citylist" :key="subcategory.id">
          <td>{{ index + 1 }}</td>
          <td>{{ subcategory.name }}</td>
          <td>{{ subcategory.category_id }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Add City</h3>
    <form v-on:submit.prevent = "createPost">
      <select v-model="countryid"  name="country" class="form-control" @change="myFunction()">
        <option countryid  disabled>Select Country</option>

        <option v-for="category in categories" v-bind:key='category.id' v-text="category.name">{{category.name}}</option>

      </select> 
      <div class="form-group">
        <label for="add-name">Name</label>
        <input v-model="subcategory.name" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-xs btn-primary">Add City</button>
      <!-- <button v-on:click="setPostId()">click</button> -->
      <router-link class="btn btn-xs btn-warning" v-bind:to="'/'">Cancel</router-link>
    </form>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      categories: [],
      category: '',
      countryid:'',
      subcategories: [],
      subcategory: {name: '', category_id: ''}
    };
  },
  mounted(){
    this.loadCategories()
  },
  created: function() {
    let uri = 'http://localhost:8000/cities/';
    Axios.get(uri).then((response) => {
      this.subcategories = response.data;
    });
  },
  computed: {
    citylist: function(){
      if(this.subcategories.length) {
        return this.subcategories;
      }
    }
  },
  methods: {
    myFunction: function() {
          console.log(this.countryid) 
    },
    loadCategories(){
      axios.get('/api/categories')
      .then(response => this.categories = response.data)
      .catch(error => console.log(error))
    },
    createPost: function() {
      let uri = 'http://localhost:8000/addsubcategory/';
      Axios.post(uri, this.subcategory).then((response) => {
        this.$router.push({name: 'City'})
      })
    }
  }
}
</script>