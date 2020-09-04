Module.register("MMM-Speedway",{
	defaults: {
		fetchInterval: 6 * 60 * 60 * 1000, //in ms
		ekstraliga: true,
		pierwszaliga: true,
		drugaliga: true
	},
	table: {"extraliga": "Loading...", "pierwszaliga": "Loading...", "drugaliga": "Loading..."},
	
	notificationReceived(notification, payload, sender) {
        if (notification === 'MODULE_DOM_CREATED') {
			this.getTable();
			setInterval(() => {
				this.getTable()
			}, this.config.fetchInterval);
        }
    },
    
	async getTable() {
        if (this.config.ekstraliga){
            this.sendSocketNotification('GET_EKSTRALIGA', "https://m.sportowefakty.wp.pl/zuzel/pge-ekstraliga/tabele");
        }
		if (this.config.pierwszaliga){
            this.sendSocketNotification('GET_PIERWSZALIGA', "https://m.sportowefakty.wp.pl/zuzel/i-liga/tabele");
        }
        if(this.config.drugaliga){
            this.sendSocketNotification('GET_DRUGALIGA', "https://m.sportowefakty.wp.pl/zuzel/polska-2-liga-zuzlowa");
        }
	},

	getDom: function() {
        
        var bigwrapper = document.createElement("div");
        
        if (this.config.ekstraliga){
            var e_header = document.createElement("header");
            e_header.innerHTML = 'Ekstraliga';
        
            var e_wrapper = document.createElement("div");
            e_wrapper.setAttribute('class', 'small');
            e_wrapper.innerHTML = this.table.extraliga + '<br>';

            bigwrapper.appendChild(e_header);
            bigwrapper.appendChild(e_wrapper);
        }
		
        if (this.config.pierwszaliga){
            var i_header = document.createElement("header");
            i_header.innerHTML = 'I. Liga';
            
            var i_wrapper = document.createElement("div");
            i_wrapper.setAttribute('class', 'small');
            i_wrapper.innerHTML = this.table.pierwszaliga + '<br>';
            
            bigwrapper.appendChild(i_header);
            bigwrapper.appendChild(i_wrapper);
        }
		
		if (this.config.drugaliga){
            var ii_header = document.createElement("header");
            ii_header.innerHTML = 'II. Liga';
            
            var ii_wrapper = document.createElement("div");
            ii_wrapper.setAttribute('class', 'small');
            ii_wrapper.innerHTML = this.table.drugaliga + '<br>';
            
            bigwrapper.appendChild(ii_header);
            bigwrapper.appendChild(ii_wrapper);
        }
		
		return bigwrapper;
	},
	
	    socketNotificationReceived: function(notification, payload) {
        if (notification === "EKSTRALIGA_RESULTS") {
			this.table.extraliga = payload;
			this.updateDom();
        }
		if (notification === "PIERWSZALIGA_RESULTS"){
			this.table.pierwszaliga = payload;
			this.updateDom();
		}
		if (notification === "DRUGALIGA_RESULTS"){
			this.table.drugaliga = payload;
			this.updateDom();
		}
        this.updateDom();
    }
});