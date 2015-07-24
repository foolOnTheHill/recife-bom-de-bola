$(document).ready(function() {

  function setLoadSprites() {
    $('#innerContent').html('<div class="center-div"><div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div></div>');
  }

  setLoadSprites();

  // Is slow this way :(. TODO: Lazy loading
  var equipes = get(createQuery('equipes', [], [], false)).data;
  var jogadores = get(createQuery('jogadores', [], [], false)).data;
  var campos = get(createQuery('campos', [], [], false)).data;
  var categorias = getCategorias(equipes);

  $('#innerContent').html('');

  // Changes the highlighting of the menu
  $('nav a').click(function() {
    setLoadSprites();
    $('nav a.mdl-navigation__link_active').removeClass('mdl-navigation__link_active');
    $(this).addClass('mdl-navigation__link_active');
  });

  $('#categoriasBtn').click(function() {
    $('#viewName').html('Categorias');
    React.render(<ModalidadesList categorias={categorias} equipes={equipes} jogadores={jogadores} />, document.getElementById('innerContent'));
  });

  $('#equipesBtn').click(function() {
    $('#viewName').html('Equipes');
    React.render(<EquipesList equipes={equipes} jogadores={jogadores} modalidade={true} />, document.getElementById('innerContent'));
  });

  $('#jogadoresBtn').click(function() {
    $('#viewName').html('Jogadores');
    React.render(<JogadoresList jogadores={jogadores} />, document.getElementById('innerContent'));
  });

  $('#camposBtn').click(function() {
    $('#viewName').html('Campos');
  });

  $('#classificacaoBtn').click(function() {
    $('#viewName').html('Classificação');
    $('#innerContent').html('<iframe class="outerContent" src="https://recifebomdebola.wordpress.com/classificacao-2/"></iframe>');
  });

  $('#tabelasBtn').click(function() {
    $('#viewName').html('Tabelas');
    $('#innerContent').html('<iframe class="outerContent" src="https://recifebomdebola.wordpress.com/tabelas-2/"></iframe>');
  });

  $('#regulamentoBtn').click(function() {
    $('#viewName').html('Regulamento');
    $('#innerContent').html('<iframe class="outerContent" src="https://recifebomdebola.wordpress.com/regulamento-2/"></iframe>');
  });

  $('#ajudaBtn').click(function() {
    $('#viewName').html('Ajuda');
  });

});
