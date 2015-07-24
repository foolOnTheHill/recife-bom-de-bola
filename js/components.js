;(function(exports) {

var JogadorView = React.createClass({
  render: function() {
    // Computes the age of the player
    var birthday = new Date(this.props.jogador.DTNASCIMENTO_JOGADOR);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Ifo that may be useful to someone...
    var additional = (
      <td className="mdl-data-table__cell--non-numeric">
        { formatString(this.props.jogador.TECNICO) }
      </td>
    );
    var tec = this.props.tecnico ? additional : '';

    // Row with the ifo of the player
    var ui = (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          { formatString(this.props.jogador.NOME_JOGADOR) }
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          { formatString(this.props.jogador.NUMERO_JOGADOR) }
        </td>
        <td className="mdl-data-table__cell--non-numeric">
          { age }
        </td>
        { tec }
        <td className="mdl-data-table__cell--non-numeric">
          { formatString(this.props.jogador.BAIRRO_JOGADOR)+', '+formatString(this.props.jogador.CIDADE_JOGADOR) }
        </td>
      </tr>
    );

    return ui;
  }
});

var JogadorCard = React.createClass({
  render: function() {
    // Simple card with the player's info
    var ui = (
      <div className="mdl-card mdl-shadow--2dp demo-card-wide center-div">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{ formatString(this.props.jogador.NOME_JOGADOR) }</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p>
            <b>Número: </b> { this.props.jogador.NUMERO_JOGADOR }<br />
            <b>Equipe: </b> { formatString(this.props.jogador.NOME_EQUIPE) }<br />
            <b>Modalidade: </b> { formatString(this.props.jogador.MODALIDADE_EQUIPE) }<br />
            <b>Técnico: </b> { formatString(this.props.jogador.TECNICO) }<br />
            <b>Endereço: </b> { formatString(this.props.jogador.BAIRRO_JOGADOR)+', '+formatString(this.props.jogador.CIDADE_JOGADOR) }
          </p>
        </div>
      </div>
    );

    return ui;
  }
});

var JogadoresList = React.createClass({
  render: function() {
    // Creates the players cards
    var jg = this.props.jogadores.map(function(j){
      return <JogadorCard jogador={ j } />;
    });

    // And shows them like a list
    var ui = (
      <div className="center-div">
        { jg }
      </div>
    );

    return ui;
  }
});
exports.JogadoresList = JogadoresList;

var DetalhesView = React.createClass({

  render: function() {
    // Creates the players rows
    var jogadores = this.props.jogadores.map(function(j) {
      return <JogadorView jogador={ j } tecnico={ false }/>
    });

    // Getting the additional info
    var tecnico = this.props.jogadores.length > 0 ? <span><h5>Técnico </h5> <p>{ formatString(this.props.jogadores[0]['TECNICO']) }</p></span> : '';

    // Puts the players info in a table
    var ui = (
      <div class="center-div">
        { tecnico }
        <h5>Jogadores</h5>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp center-div">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">
                Nome
              </th>
              <th className="mdl-data-table__cell--numeric">
                Número
              </th>
              <th className="mdl-data-table__cell--numeric">
                Idade
              </th>
              <th className="mdl-data-table__cell--non-numeric">
                Cidade
              </th>
            </tr>
          </thead>
          <tbody>
            { jogadores }
          </tbody>
        </table>
      </div>
    );

    return ui;
  }
});

var EquipeView = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },
  handleClick: function() {
    this.setState({
      active: !this.state.active
    });
  },
  render: function() {
    // Additional info about the team
    var detalhesView = <DetalhesView jogadores={ this.props.jogadores }/>

    var activeComp = (
      <div className="mdl-card__actions mdl-card--border">
        <a onClick={this.handleClick} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Ocultar Detalhes da Equipe
        </a>
        {detalhesView}
      </div>
    );

    var notActiveComp = (
      <div className="mdl-card__actions mdl-card--border">
        <a onClick={this.handleClick} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Mostrar Detalhes da Equipe
        </a>
      </div>
    );

    var comp = this.state.active ? activeComp : notActiveComp;

    var modalidade = this.props.modalidade ? <h5> Modalidade <b>{ formatString(this.props.equipe.categoria) }</b> </h5> : '';

    // Card with the team's info
    var ui = (
      <div className="mdl-card mdl-shadow--2dp demo-card-wide center-div">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">{ formatString(this.props.equipe.equipe) }</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p>
            {modalidade}<br />
            <b>Cartões Amarelos:</b> { this.props.equipe.cartao_amarelo } <br />
            <b>Cartões Vermelhos:</b> { this.props.equipe.cartao_vermelho }
          </p>
        </div>
        { comp }
      </div>
    );

    return ui;
  }
});

var EquipesList = React.createClass({
  render: function() {
    // Creates the teams views
    var jogadores = this.props.jogadores;
    var modalidade = this.props.modalidade;
    var eq = this.props.equipes.map(function(e) {
      return <EquipeView equipe={ e } jogadores={ getJogadoresByEquipe(e.equipe, jogadores) } modalidade={ modalidade }/>;
    });

    // And shows them like a list
    var ui = (
      <div className="center-div">
        { eq }
      </div>
    );

    return ui;
  }
});
exports.EquipesList = EquipesList;

var ModalidadeView = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },
  handleClick: function() {
    this.setState({
      active: !this.state.active
    });
  },
  render: function() {
    var equipesList = <EquipesList equipes={ this.props.equipes } jogadores={ this.props.jogadores } modalidade={ false }/>;
    var additional = this.state.active ? equipesList : '';

    var instructions = this.state.active ? 'Clique para reduzir' : 'Clique para expandir';

    // Row with categories info
    var ui = (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          <h6 onClick={ this.handleClick } className="pointer">{ this.props.modalidade } <small className="to-the-right">{ instructions }</small></h6>
          { additional }
        </td>
      </tr>
    );

    return ui;
  }
});

var ModalidadesList = React.createClass({
  getInitialState: function() {

  },
  render: function() {
    document.getElementById('search').onchange(this.search);

    var equipes = this.props.equipes;
    var jogadores = this.props.jogadores;
    var modalidades = this.props.categorias.map(function(m) {
      var eq = getEquipesByCategoria(m, equipes);
      var jg = getJogadoresByCategoria(m, jogadores);
      return <ModalidadeView modalidade={ m } equipes={ eq } jogadores={ jg }/>
    });

    // Table with the categories
    var ui = (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp center-div">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">
              <h4> Modalidades </h4>
            </th>
          </tr>
        </thead>
        <tbody>
          { modalidades }
        </tbody>
      </table>
    );

    return ui;
  }
})
exports.ModalidadesList = ModalidadesList;

})(typeof exports === 'undefined' ? this : exports);
