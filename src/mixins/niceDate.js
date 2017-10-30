import moment from 'moment';


export default {
  methods: {
    '$niceDate'(date, year, format) {
      if(year === undefined) {
        year = true;
      }
      if(format === undefined) {
        format = '{Y} {M} {D}';
      }
      if(typeof date === 'string') {
        let s = date.split('-');
        date = new Date(s[0], s[1]-1, s[2]);
      }
      if(!date) {
        return '';
      }
      format = format.replace('{Y}', year ? date.getFullYear() + ' ' : '');
      format = format.replace('{M}', moment(date).format('MMM'));
      format = format.replace('{D}', date.getDate());
      return format.trim();
    },
    '$niceDateRange'(start, end, year) {
      if(!start || start.length < 1 || !end || end.length < 1) {
        return '';
      }
      if(year === undefined) {
        year = true;
      }
      if(typeof start === 'string') {
        let s = start.split('-');
        start = new Date(s[0], s[1]-1, s[2]);
      }
      if(typeof end === 'string') {
        let s = end.split('-');
        end = new Date(s[0], s[1]-1, s[2]);
      }
      let r = (year ? start.getFullYear() + ' ' : '') + moment(start).format('MMM') + ' ' + start.getDate() + ' - ';
      if(start.getMonth() !== end.getMonth()) {
        r+= moment(end).format('MMM') + ' ';
      }
      r+= end.getDate();
      return r;
    }
  }
}

