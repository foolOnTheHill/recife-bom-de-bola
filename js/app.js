$(document).ready(function() {

  function hideAllSearchBoxes() {
    $("#modalidadesSearchBox").addClass('hidden');
    $("#equipesSearchBox").addClass('hidden');
    $("#jogadoresSearchBox").addClass('hidden');
    $('#camposSearchBox').addClass('hidden');
  }

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
    $("#modalidadesSearchBox").removeClass('hidden');
    $("#equipesSearchBox").addClass('hidden');
    $("#jogadoresSearchBox").addClass('hidden');
    $('#camposSearchBox').addClass('hidden');

    $('#viewName').html('Categorias');
    React.render(<ModalidadesList categorias={categorias} equipes={equipes} jogadores={jogadores} />, document.getElementById('innerContent'));
  });

  $('#equipesBtn').click(function() {
    $("#modalidadesSearchBox").addClass('hidden');
    $("#equipesSearchBox").removeClass('hidden');
    $("#jogadoresSearchBox").addClass('hidden');
    $('#camposSearchBox').addClass('hidden');

    $('#viewName').html('Equipes');
    React.render(<EquipesList equipes={equipes} jogadores={jogadores} modalidade={true} />, document.getElementById('innerContent'));
  });

  $('#jogadoresBtn').click(function() {
    $("#modalidadesSearchBox").addClass('hidden');
    $("#equipesSearchBox").addClass('hidden');
    $("#jogadoresSearchBox").removeClass('hidden');
    $('#camposSearchBox').addClass('hidden');

    $('#viewName').html('Jogadores');
    React.render(<JogadoresList jogadores={jogadores} />, document.getElementById('innerContent'));
  });

  $('#camposBtn').click(function() {
    $("#modalidadesSearchBox").addClass('hidden');
    $("#equipesSearchBox").addClass('hidden');
    $("#jogadoresSearchBox").addClass('hidden');
    $('#camposSearchBox').removeClass('hidden');

    $('#viewName').html('Campos');
    React.render(<CamposList campos={campos} />, document.getElementById('innerContent'));
  });

  $('#classificacaoBtn').click(function() {
    hideAllSearchBoxes();

    $('#viewName').html('Classificação');
    $('#innerContent').html('<iframe class="outerContent" src="https://recifebomdebola.wordpress.com/classificacao-2/"></iframe>');
  });

  $('#tabelasBtn').click(function() {
    hideAllSearchBoxes();

    $('#viewName').html('Tabelas');
    $('#innerContent').html('<iframe class="outerContent" src="https://recifebomdebola.wordpress.com/tabelas-2/"></iframe>');
  });

  $('#regulamentoBtn').click(function() {
    hideAllSearchBoxes();

    $('#viewName').html('Regulamento');
    $('#innerContent').html('<iframe class="outerContent" src="https://recifebomdebola.wordpress.com/regulamento-2/"></iframe>');
  });

  $('#ajudaBtn').click(function() {
    hideAllSearchBoxes();

    $('#viewName').html('Ajuda');
  });

});
