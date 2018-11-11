window.onload = init;

function init() {
    new Vue({
        el: '#app',
        data: {
            restaurants: [],
            input: "",
            page:1,
            pagesize:10,
            cuisine:"",
            name:""
        },
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            this.getDataFromWebService();
        },
        methods: {
            
            getDataFromWebService: function () {
                let url = "http://localhost:8080/api/restaurants?pagesize="+this.pagesize+"&name="+this.input+"&page="+this.page;
                this.input="";
                fetch(url).then((data) => {
                    console.log("les données sont arrivées !")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    // ici on a bien un objet JS
                    this.restaurants = dataEnJavaScript.data;
                });
            },
            ajouter: function () {
                var data= new FormData();
                data.append("nom",this.name);
                data.append("cuisine",this.cuisine);
                fetch("http://localhost:8080/api/restaurants", { 
                method: "POST", 
                body: data 
                })
                this.nom="";
                this.cuisine="";
                this.getDataFromWebService();
            },
            supprimer: function (restaurant) {
                fetch("http://localhost:8080/api/restaurants/"+restaurant._id, { 
                method: "DELETE", 
                })
                this.getDataFromWebService();
            },
            modifier: function (restaurant) {
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
