// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    //console.log(JSON.stringify(context.data.text))
    if(context.data.text){
      context.result ="ANANI SIKIM";
      return context;
    }
  };
};
