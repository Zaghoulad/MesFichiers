window.onload = init;

function init() {
    new Vue({
        el: '#app',
        data: {
            restaurants: [],
            input: "",//Pour la recherche
            page:1,
            count:0,
            pagesize:10,
            cuisine:"",
            nom:"",
            ncuisine:"",//new type de cuisine (pour la modification)
            nnom:"r",//new nom (pour la modification)
            //Pour la modification
            //
            pid:0//previous id = Ancient id 

        },
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            this.getDataFromWebService();
        },
        methods: {
            
            getDataFromWebService: function () {
                let url = "http://localhost:8080/api/restaurants?page="+this.page+"&name="+this.input+"&pagesize="+this.pagesize;
                this.input="";
                fetch(url).then((data) => {
                    console.log("les données sont arrivées !")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    // ici on a bien un objet JS
                    this.restaurants = dataEnJavaScript.data;
                    this.count=parseInt(dataEnJavaScript.count/this.pagesize);
                });
            },
            addRestaurant: function () {
                var data= new FormData();
                data.append("nom",this.nom);
                data.append("cuisine",this.cuisine);
                fetch("http://localhost:8080/api/restaurants", { 
                method: "POST", 
                body: data 
                })
                this.nom="";
                this.cuisine="";
                this.getDataFromWebService();
            },
            modifierRestaurant: function () {
                var data= new FormData();
                data.append("nom",this.nnom);
                data.append("cuisine",this.ncuisine);
                fetch("http://localhost:8080/api/restaurants/"+this.pid, { 
                method: "PUT", 
                body: data 
                })
                this.visible.visibility='hidden';
                this.getDataFromWebService();
                
            },
            supprimerRestaurant: function (restaurant) {
                fetch("http://localhost:8080/api/restaurants/"+restaurant._id, { 
                method: "DELETE", 
                })
                this.getDataFromWebService();
            },
            rendrevisible:function(restaurant){
                this.nnom=restaurant.name;
                this.ncuisine=restaurant.cuisine;
                this.pid=restaurant._id;
                this.getDataFromWebService();
            },
            getColor: function (index) {
                return (index % 2) ? 'red' : 'green';
            },
            pagePrecedente:function(){
                this.page--;
            },
            pageSuivante:function(){
                this.page++;
               
                this.getDataFromWebService();
            }
            
        }
    })
}
