new Vue({
  el: '#app',
   data: {
    seen: true,
    email: '',
    rut: '',
    phone: '',
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
  },
  computed: {},
  methods: {
    isEmailValid: function() {
      return (this.email == "")? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
    },
    isRutValid: function() {
        return (this.rut == "")? "" : (Fn.validateRut(this.rut)) ? 'has-success' : 'has-error';
    },
    isPhoneValid: function() {
        return (this.phone == "") ? "" : (this.phone.length == 9) ? 'has-success' : 'has-error';
    }
  },
  components: {
        vuejsDatepicker
    }
});

// rut validation

var Fn = {
	validateRut : function (newRut) {
		newRut = newRut.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( newRut ))
			return false;
		var tmp 	= newRut.split('-');
		var digv	= tmp[1];
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;

		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}
