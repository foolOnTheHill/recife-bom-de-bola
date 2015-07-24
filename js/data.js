;(function(exports) {

var formatString = function(str) {
  return str.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.formatString = formatString;

var filterByAttribute = R.curry(function(attribute, value, objects) {
  return R.filter(function(obj) {
    if ((typeof value === "string") && (typeof obj[attribute] === "string")) {
      return obj[attribute].toLowerCase() === value.toLowerCase();
    } else {
      return obj[attribute] === value;
    }
  }, objects);
});

var getCategorias = R.reduce(function (res, obj) {
  if (!R.contains(obj.categoria, res)) {
    res.push(obj.categoria);
  }
  return res;
}, []);

var getJogadoresByCategoria = filterByAttribute('MODALIDADE_EQUIPE');
var getEquipesByCategoria = filterByAttribute('categoria');
var getJogadoresByEquipe = filterByAttribute('NOME_EQUIPE');
var getJogadoresByCategoriaAndEquipe = function(categoria, equipe, jogadores) {
  return (R.compose(getJogadoresByEquipe(equipe), getEquipesByCategoria(categoria)))(jogadores);
}

exports.getCategorias = getCategorias;
exports.getJogadoresByCategoria = getJogadoresByCategoria;
exports.getEquipesByCategoria = getEquipesByCategoria;
exports.getJogadoresByEquipe = getJogadoresByEquipe;

})(typeof exports === 'undefined' ? this : exports);
