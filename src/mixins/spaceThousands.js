
export default {
  methods: {
    '$spaceThousands'(number, decimals) {
      if(decimals === undefined) {
        decimals = 0;
      }
      number = parseFloat(number);
      number = number.toFixed(decimals);
      let parts = number.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      if(parts.length > 0) {
        return parts.join('.');
      }
      return parts[0];
    }
  }
}